// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const app = require('./app');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('markdown-blog-extension.createFile', function () {		
		
		let currentDirectory = app.getCurrentDirectory();
		console.log(currentDirectory);
		let workspacePath = app.getWorkspacePath();
		console.log(workspacePath);
		if(!currentDirectory) {
			currentDirectory = workspacePath;
			if(!currentDirectory) {
				app.showErrorMessage('No Active Text Editor or Active workspace');
				return;
			}
		}

		vscode.window.showInputBox({
			placeHolder: 'Enter file name',
			value: '',
			ignoreFocusOut: true,			
		}).then(function (fileName) {
			// Create file in current directory
			let filepath = app.createFile(currentDirectory, fileName);
			if(!filepath) {
				app.showErrorMessage('Failed to create file');
				return;
			}
			// get the last created file and show it
			vscode.window.showTextDocument(vscode.Uri.file(filepath));
		})
		
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
