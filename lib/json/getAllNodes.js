const fs = require('fs');
const path = require('path');

const settings = require('../../settings');

module.exports = function getAllNodes(options = {}){

	let path = options.test ? settings.nodesTestPath : settings.systemNodesPath
	if(!fs.existsSync(path)) {
    throw "System Nodes DB does not exist: " + path
	}

	let jsonString = fs.readFileSync(path, 'utf8');
	if(!jsonString)
		throw "Nodes DB is empty";

	try {
		let nodes = JSON.parse(jsonString);
		return nodes;
	} catch (e) {
		throw e
	}
}
