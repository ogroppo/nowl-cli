const fs = require('fs');
const path = require('path');
const systemNodesPath = '../../data/json/nodes.json';
const nodesTestPath = '../../fixtures/nodes.json';

module.exports = function setAllNodes(nodes){
	let absPath = path.resolve(__dirname, systemNodesPath);
	if(filter.test)
		absPath = path.resolve(__dirname, nodesTestPath);

	try {
		fs.writeFileSync(absPath, JSON.stringify(nodes, null, 2))
	} catch (e) {
		throw e
	}
}
