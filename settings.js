const path = require('path')

module.exports = {
	systemNodesPath: path.resolve(__dirname, 'data/json/nodes.json'),
	relsPath: path.resolve(__dirname, 'data/json/rels.json'),
	nodesTestPath: path.resolve(__dirname, 'fixtures/nodes.json'),
	relsTestPath: path.resolve(__dirname, 'fixtures/rels.json'),
	domainsPath: path.resolve(__dirname, 'data/domains.json')
}
