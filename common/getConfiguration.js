const { workspace } = require('vscode');

const getConfiguration = function () {
	let { rootUrl, project, folderName } = workspace.getConfiguration(
		'openGrok'
	).serverSettings;
	if (!rootUrl) {
		throw new Error('Root URL not configured');
	}
	if (!project) {
		throw new Error('Project name not configured');
	}
	if (!folderName) {
		folderName = 'source';
	}
	return { rootUrl, project, folderName };
};
module.exports = getConfiguration;
