// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const {window, commands, ExtensionContext} = require('vscode');
const commandsToRegister = require('./commands');

const commandHandlerWrapper = (fn) => {
	return () => {
		try {
			fn();
		} catch (error) {
			window.showErrorMessage(error.message);
		}
	};
};

/**
 * @param {ExtensionContext} context
 */
function activate(context) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	Object.keys(commandsToRegister).forEach((command) => {
		let disposable = commands.registerCommand(
			command,
			commandHandlerWrapper(commandsToRegister[command])
		);
		context.subscriptions.push(disposable);
	});
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
