const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

class App{

    getCurrentDirectory() {
        const currentPath = vscode.window.activeTextEditor?.document.uri.fsPath;

        if(!currentPath) {
            return '';
        }
        const currentDirectory = path.dirname(currentPath);

        return currentDirectory;
    }

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

    createFile(currentDirectory, fileName) {
        const filePath = path.join(currentDirectory, fileName);
        // fill the file with a YAML frontmatter
        const data = `---\ntitle: ${fileName}\npublished_at: ${new Date().toISOString()}\nupdated_at: ${new Date().toISOString()}\ntype: article\ndescription: ${fileName}\nlink: /${new Date().getFullYear()}/${fileName}\nimage:\ntags:[]\n---`;

        fs.writeFile(filePath, data.trim(), err => {
            if(err) {
                console.log(err);
            }            
        });

        // return the path of the created file
        return filePath;
    }

    showErrorMessage(message) {
        vscode.window.showErrorMessage(message);
    }
}

module.exports = new App();