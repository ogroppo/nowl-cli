const fs = require('fs');
const path = require('path');

const systemNodesPath = '../../data/json/nodes.json';
const nodesTestPath = '../../fixtures/nodes.json';

const setAllNodes = require('setAllNodes');
const compareObject = require('./compareObject')

module.exports = function updateNode(selector, options = {}){

	let allNodes = getAllNodes(options)

	allNodes.forEach(node => {
		if(compareObject(node, selector)){
			node = mergeObject(node, selector)
			node.updatedAt = new Date().toISOString()
		}
	})

	setAllNodes(allNodes)
}
