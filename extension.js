// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

function getOpenGrokUrlPartFromConfiguration() {
	const { rootUrl, project } = vscode.workspace.getConfiguration('openGrok').serverSettings;
	if (!rootUrl) {
		throw new Error('Root URL not configured');
	}
	if (!project) {
		throw new Error('Project name not configured');
	}
	return `${rootUrl}/source/xref/${project}`;
}

function getFileUrlPart() {
	if (!vscode.window.activeTextEditor) {
		return;
	}
	const rootPath = vscode.workspace.rootPath;
	const fileName = vscode.window.activeTextEditor.document.fileName;
	const relativeFilePath = fileName.split(rootPath)[1];
	const line = vscode.window.activeTextEditor.selection.active.line + 1;
	return `${relativeFilePath}#${line}`;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-opengrok" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-opengrok.openFileOnRemote', function () {
		// The code you place here will be executed every time your command is executed
		try {
			const openGrokUrlPart = getOpenGrokUrlPartFromConfiguration();
			const fileUrlPart = getFileUrlPart();
			
			if (fileUrlPart) {
				vscode.env.openExternal(vscode.Uri.parse(openGrokUrlPart + fileUrlPart));
			}
			
		} catch (error) {
			vscode.window.showErrorMessage(error.message);
		}
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
