const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

class App {
  /**
   * Retrieves the current directory path.
   *
   * @return {string} The current directory path as a string.
   */
  getCurrentDirectory() {
    const currentPath = vscode.window.activeTextEditor?.document.uri.fsPath;

    if (!currentPath) {
      return '';
    }
    const currentDirectory = path.dirname(currentPath);

    return currentDirectory;
  }

  /**
   * Retrieves the path of the active workspace folder.
   *
   * @return {string} The path of the active workspace folder.
   */
  getWorkspacePath() {
    // Get the active workspace folder
    let workspaceFolders = vscode.workspace.workspaceFolders;
    console.log(`workspaceFolders: ${JSON.stringify(workspaceFolders)}`);
    if (!workspaceFolders) {
      return '';
    }
    const workspaceFolderPath = workspaceFolders[0].uri.fsPath;
    console.log(`workspaceFolderPath: ${workspaceFolderPath}`);
    return workspaceFolderPath;
  }

  /**
   * Creates a file with a YAML frontmatter in the specified directory.
   *
   * @param {string} currentDirectory - The directory where the file will be created.
   * @param {string} fileName - The name of the file to be created.
   * @return {string} The path of the created file.
   */
  createFile(currentDirectory, fileName) {
    if(!fileName.endsWith('.md')) {
      fileName += '.md';
    }
    // if the name contains spaces or special characters, replace them with dashes
    if(fileName.includes(' ')) {
      fileName = fileName.split(/\s+/g).join('-');
    }

    // if the file already exists, ask the user if they want to overwrite it

    const originalFilename = fileName;
    // prefixes filename with the current date and format month and day
    fileName = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${(new Date().getDate()).toString().padStart(2, '0')}-${fileName}`;

    const filePath = path.join(currentDirectory, fileName);

    let data;
    if (this.readYmlFile(this.getConfigFilePath())) {
      data = this.readYmlFile(this.getConfigFilePath());
      data['published_at'] = new Date().toISOString();
      data['updated_at'] = new Date().toISOString();
      // convert filename to title, replace underscores and dashes with spaces
      data['title'] = originalFilename.split('.')[0].replace(/_/g, ' ').replace(/-/g, ' ');
      data['link'] = `/${new Date().getFullYear()}/${originalFilename.split('.')[0]}`;
      data = `---\n${yaml.dump(data)}---`;
    } else {
      // fill the file with a YAML frontmatter
      data = `---\ntitle: ${
        originalFilename.split('.')[0]
      }\npublished_at: ${new Date().toISOString()}\nupdated_at: ${new Date().toISOString()}\ntype: article\ndescription: Enter description here\nlink: /${new Date().getFullYear()}/${originalFilename}\nimage: images/image.png\ntags: [tag1,tag2]\n---`;
    }

    fs.writeFile(filePath, data, (err) => {
      if (err) {
        console.log(err);
      }
    });

    // return the path of the created file
    return filePath;
  }

  /**
   * Displays an error message to the user.
   *
   * @param {string} message - The error message to display.
   * @return {void} This function does not return a value.
   */
  showErrorMessage(message) {
    vscode.window.showErrorMessage(message);
  }

  getConfigFilePath() {
    // Step 1: Check if config file exists in workspace
    const workspaceFolders = vscode.workspace.workspaceFolders;
    let configFilePath = null;
    if (workspaceFolders) {
      for (const folder of workspaceFolders) {
        const folderPath = folder.uri.fsPath;
        const filePath = `${folderPath}/markdown-blog.yaml`;
        if (fs.existsSync(filePath)) {
          // console.log(`configFilePath: ${filePath}`);
          configFilePath = filePath;
          break;
        }
      }
    }
    return configFilePath;
  }

  readYmlFile(filePath) {
    // Step 2: Read and parse YAML front-matter from config file
    let config = null;
    if (filePath) {
      try {
        // console.log('Reading file:', filePath);
        const configContent = fs.readFileSync(filePath, 'utf8');
        // console.log('File content:', configContent);

        config = yaml.load(configContent);
        // console.log('Parsed config:', config);
      } catch (error) {
        console.error('Error reading YAML file:', error);
      }
    }
    return config;
  }
}

module.exports = new App();
