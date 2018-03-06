const fs = require('fs');
const settings = require('../../settings');

module.exports = function setAllNodes(nodes, options){

	let path = options.test ? settings.nodesTestPath : settings.systemNodesPath
	try {
		fs.writeFileSync(path, JSON.stringify(nodes, null, 2))
	} catch (e) {
		throw e
	}
}
