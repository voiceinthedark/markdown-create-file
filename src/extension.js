// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const app = require('./app');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('markdown-blog-extension.createFile', function () {
		// The code you place here will be executed every time your command is executed
		
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
