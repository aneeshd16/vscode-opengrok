const { workspace, window, env, Uri } = require('vscode');
const { getConfiguration } = require('../common');

function getOpenGrokUrlPartFromConfiguration() {
	const { rootUrl, project } = getConfiguration();
	return `${rootUrl}/source/xref/${project}`;
}

function getFileUrlPart() {
	if (!window.activeTextEditor) {
		return;
	}
	const rootPath = workspace.rootPath;
	const fileName = window.activeTextEditor.document.fileName;
	const relativeFilePath = fileName.split(rootPath)[1];
	const line = window.activeTextEditor.selection.active.line + 1;
	return `${relativeFilePath}#${line}`;
}

const openFileOnRemote = function () {
	const openGrokUrlPart = getOpenGrokUrlPartFromConfiguration();
	const fileUrlPart = getFileUrlPart();

	if (fileUrlPart) {
		env.openExternal(Uri.parse(openGrokUrlPart + fileUrlPart));
	}
};

module.exports = openFileOnRemote;
