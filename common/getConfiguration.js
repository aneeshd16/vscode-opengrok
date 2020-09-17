const { workspace } = require('vscode');

const getConfiguration = function () {
	const { rootUrl, project } = workspace.getConfiguration(
		'openGrok'
	).serverSettings;
	if (!rootUrl) {
		throw new Error('Root URL not configured');
	}
	if (!project) {
		throw new Error('Project name not configured');
	}
	return { rootUrl, project };
};
module.exports = getConfiguration;
