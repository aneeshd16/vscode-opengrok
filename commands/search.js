const { window, env, Uri } = require('vscode');
const { getConfiguration } = require('../common');

const search = async function () {
	const editor = window.activeTextEditor;
	let selectedText = editor.selection.isSingleLine
		? editor.document.getText(editor.selection)
		: '';
	const result = await window.showInputBox({
		value: selectedText || '',
		placeHolder: 'Enter text to search',
		validateInput: (text) => {
			return text ? null : 'Please enter a string';
		},
	});
	if (!result) {
		return;
	}
	const { rootUrl, project, folderName } = getConfiguration();
	const searchUrl = `${rootUrl}/${folderName}/search?project=${encodeURIComponent(
		project
	)}&q=${encodeURIComponent(result)}`;
	env.openExternal(Uri.parse(searchUrl));
};

module.exports = search;
