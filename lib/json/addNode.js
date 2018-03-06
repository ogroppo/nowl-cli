const fs = require('fs')
const path = require('path')

const settings = require('../../settings')

const calcNewId = require('./calcNewId')
const getAllNodes = require('./getAllNodes')

module.exports = function addNode(selector, options = {}){

	let allNodes = getAllNodes(options)

	let node = Object.assign({}, selector)

	node.id = calcNewId(allNodes)
	node.createdAt = new Date().toISOString()

	allNodes.push(node)

	try {
		let path = options.test ? settings.nodesTestPath : settings.systemNodesPath
		let content = JSON.stringify(allNodes, null, 2)
		fs.writeFileSync(path, content)
	} catch (e) {
		throw e
	}

	return node
}
