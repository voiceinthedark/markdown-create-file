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
        const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri?.path;
        return workspacePath;
    }

    checkIsFile(filePath) {
        return fs.existsSync(filePath);
    }

    parseFileOrDirectory(fullPaths) {
        const filePaths = [];
        const folderPaths = [];

        fullPaths.forEach(fullPath => {
            if(this.checkIsFile(fullPath)) {
                filePaths.push(fullPath);
            } else {
                folderPaths.push(fullPath);
            }
        });
        return {filePaths, folderPaths};

    }

    parseUserInput(userInputs) {
        const {filePaths, folderPaths} = this.parseFileOrDirectory(userInputs);
        return {filePaths, folderPaths};        
    }

    createFile(currentDirectory, fileName) {
        const filePath = path.join(currentDirectory, fileName);
        // fill the file with a YAML frontmatter
        const data = `
        ---
        title: ${fileName}
        published_at: ${new Date().toISOString()}
        updated_at: ${new Date().toISOString()}
        type: article
        description: ${fileName}
        link: /${new Date().getFullYear()}/${fileName}
        image:
        tags:[]
        ---
        `;

        fs.writeFile(filePath, data, err => {
            if(err) {
                console.log(err);
            }            
        });
    }

    showErrorMessage(message) {
        vscode.window.showErrorMessage(message);
    }
}

module.exports = new App();