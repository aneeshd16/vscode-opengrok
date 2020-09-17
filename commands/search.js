const { window, env, Uri } = require('vscode');
const { getConfiguration } = require('../common');

const search = async function () {
	const result = await window.showInputBox({
		value: '',
		placeHolder: 'Enter text to search',
		validateInput: (text) => {
			return text ? null : 'Please enter a string';
		},
	});
	const { rootUrl, project } = getConfiguration();
	const searchUrl = `${rootUrl}/source/search?project=${encodeURIComponent(
		project
	)}&q=${encodeURIComponent(result)}`;
	env.openExternal(Uri.parse(searchUrl));
};

module.exports = search;
