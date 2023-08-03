const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

class App{

    /**
     * Retrieves the current directory path.
     *
     * @return {string} The current directory path as a string.
     */
    getCurrentDirectory() {
        const currentPath = vscode.window.activeTextEditor?.document.uri.fsPath;

        if(!currentPath) {
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
        if(!workspaceFolders) {
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
        const originalFilename = fileName;
        // prefixes filename with the current date
        fileName = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}-${fileName}`;

        const filePath = path.join(currentDirectory, fileName);
        // fill the file with a YAML frontmatter
        const data = `---\ntitle: ${originalFilename.split('.')[0]}\npublished_at: ${new Date().toISOString()}\nupdated_at: ${new Date().toISOString()}\ntype: article\ndescription: Enter description here\nlink: /${new Date().getFullYear()}/${originalFilename}\nimage: images/image.png\ntags: [tag1,tag2]\n---`;

        fs.writeFile(filePath, data.trim(), err => {
            if(err) {
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
}

module.exports = new App();