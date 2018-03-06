const fs = require('fs');
const path = require('path');

const systemNodesPath = '../../data/json/nodes.json';
const nodesTestPath = '../../fixtures/nodes.json';

const setAllNodes = require('./setAllNodes');
const compareObject = require('./compareObject')
const getAllNodes = require('./getAllNodes')
const mergeObject = require('./mergeObject')

module.exports = function updateNode(selector, options = {}){

	let allNodes = getAllNodes(options)

	for (var node of allNodes) {
		if(node.name === selector.name){
			node = mergeObject(node, selector)
			node.updatedAt = new Date().toISOString()
			setAllNodes(allNodes, options)
			return node
		}
	}
}
