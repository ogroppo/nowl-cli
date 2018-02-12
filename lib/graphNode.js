const csv = require('fast-csv');
const path = require('path');
const parseCsvNode = require('./parseCsvNode');
const getNode = require('./getNode');
const getRels = require('./getRels');

let domain = "../db/default-csv-domain/";
let nodesFile = path.join(__dirname, domain, 'nodes.csv');
let nodeModel = require('../db/nodeModel')

module.exports = (nodeToRoot) =>
	new Promise(async (resolve, reject)=>{
		let rootNode = await getNode(nodeToRoot)
		if(!rootNode)
			return resolve()

		if(nodeToRoot.labels && nodeToRoot.labels.length)
			rootNode.labels = nodeToRoot.labels

		let graph = {
			root: {node: rootNode},
			distinctParents: [],
			distinctChildren: [],
		}

		let childRelSelector = {
			alias: 'childRels',
			start: rootNode.id
		}
		if(nodeToRoot.labels)
			childRelSelector.startLabel = nodeToRoot.labels[0]

		let parentRelSelector = {
			alias: 'parentRels',
			end: rootNode.id
		}
		if(nodeToRoot.labels)
			parentRelSelector.endLabel = nodeToRoot.labels[0]

		let {childRels, parentRels} = await getRels(childRelSelector, parentRelSelector)

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
		//let connectorId = childRel.id childRel.end
		if(graph.distinctChildren.includes(childRel.id))
			continue

		let childNode = await getNode({id: childRel.end})
		if(!childNode)
			continue
		graph.distinctChildren.push(childRel.id)

		graph.children[levelIndex] = graph.children[levelIndex] || []
		graph.children[levelIndex].push({
			rel: childRel,
			node: childNode
		})

		//if depth...
		let {grandChildRels} = await getRels({alias: 'grandChildRels', start: childRel.end})
		if(grandChildRels)
			await addChildLevel(graph, grandChildRels, levelIndex + 1)
	}
}

async function addParentLevel(graph, parentRels, levelIndex = 1){
	graph.parents = graph.parents || {}
	for (let parentRel of parentRels) {
		if(graph.distinctParents.includes(parentRel.id))
			continue

		let parentNode = await getNode({id: parentRel.start})
		if(!parentNode)
			continue
		graph.distinctParents.push(parentRel.id)

		graph.parents[levelIndex] = graph.parents[levelIndex] || []
		graph.parents[levelIndex].push({
			rel: parentRel,
			node: parentNode
		})


		//if depth...
		let {grandParentRels} = await getRels({alias: 'grandParentRels', end: parentRel.start})
		if(grandParentRels)
			await addParentLevel(graph, grandParentRels, levelIndex + 1)
	}
}
