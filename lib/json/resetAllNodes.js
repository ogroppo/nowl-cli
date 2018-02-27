const fs = require('fs')
const path = require('path')

const settings = require('../../settings')

const resetAllNodes = require('./resetAllNodes')

module.exports = function resetAllNodes(options = {}){
	try {
		let path = options.test ? settings.nodesTestPath : settings.systemNodesPath
		fs.writeFileSync(path, JSON.stringify([], null, 2))
	} catch (e) {
		throw e
	}
}
