const csv = require('fast-csv');
const path = require('path');
const parseCsvNode = require('./parseCsvNode');
const getNodes = require('./getNodes');
const getNode = require('./getNode');
const getRels = require('./getRels');

let domain = "../db/og-domain/";
let nodesFile = path.join(__dirname, domain, 'nodes.csv');
let nodeModel = require('../db/nodeModel')

module.exports = (nodeToRoot) =>
	new Promise(async (resolve, reject)=>{
		let rootNode = await getNode(nodeToRoot)
		if(!rootNode)
			return reject("Root node not found")

		let graph = {
			root: {node: rootNode},
			distinctNodes: [rootNode.id]
		}

		let {childRels, parentRels} = await getRels({alias: 'childRels', start: rootNode.id}, {alias: 'parentRels', end: rootNode.id})

		if(childRels){
			await addChildLevel(graph, childRels)
		}

		if(parentRels){
			await addParentLevel(graph, parentRels)
		}

		resolve(graph)
	})


async function addChildLevel(graph, childRels, levelIndex = 1){
	graph.children = graph.children || {}
	for (let childRel of childRels) {
		let childNode = await getNode({id: childRel.end})
		if(!childNode)
			continue

		graph.children[levelIndex] = graph.children[levelIndex] || []
		graph.children[levelIndex].push({
			rel: childRel,
			node: childNode
		})

		if(graph.distinctNodes.includes(childRel.end))
			continue
		graph.distinctNodes.push(childNode.id)
		//if depth...
		let {grandChildRels} = await getRels({alias: 'grandChildRels', start: childRel.end})
		if(grandChildRels)
			await addChildLevel(graph, grandChildRels, levelIndex + 1)
	}
}

async function addParentLevel(graph, parentRels, levelIndex = 1){
	graph.parents = graph.parents || {}
	for (let parentRel of parentRels) {
		let parentNode = await getNode({id: parentRel.start})
		if(!parentNode)
			continue

		graph.parents[levelIndex] = graph.parents[levelIndex] || []
		graph.parents[levelIndex].push({
			rel: parentRel,
			node: parentNode
		})

		if(graph.distinctNodes.includes(parentNode.id))
			continue
		graph.distinctNodes.push(parentNode.id)
		//if depth...
		let {grandParentRels} = await getRels({alias: 'grandParentRels', end: parentRel.start})
		if(grandParentRels)
			await addParentLevel(graph, grandParentRels, levelIndex + 1)
	}
}
