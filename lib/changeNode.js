const csv = require('fast-csv');
const path = require('path');
const getNodes = require('./getNodes');
const setNode = require('./setNode');
const updateNode = require('./updateNode');
const updateRel = require('./updateRel');
const deleteNode = require('./deleteNode');
const getRels = require('./getRels');
const getNode = require('./getNode');

let domain = "../db/og-domain/";
let nodesFile = path.join(__dirname, domain, 'nodes.csv');

module.exports = (nodeToChange, nodeWithChanges) =>
	new Promise(async (resolve, reject)=>{
		let gettedNode = await getNode(nodeToChange)
		if(!gettedNode)
			return reject(`"${nodeToChange.name}" does not exist`)

		if(nodeToChange.name !== nodeWithChanges.name){
			nodeWithChanges = transferLabels(gettedNode, nodeWithChanges)
			let settedNode = await setNode(nodeWithChanges)
			let deletedNode = await deleteNode(nodeToChange)
			console.log('deletedNode', deletedNode);
			let {parentRels, childRels} = await getRels(
				{alias: 'parentRels', end: deletedNode.id},
				{alias: 'childRels', start: deletedNode.id}
			)
			if(parentRels)
				for(let parentRel of parentRels){
					parentRel.end = settedNode.id
					await updateRel(parentRel)
				}
			if(childRels)
				for(let childRel of childRels){
					childRel.start = settedNode.id
					await updateRel(childRel)
				}

			resolve(settedNode)
		}
	})


function transferLabels(originalNode, targetNode){
	targetNode.labels = targetNode.labels || []
	let extraLabels = originalNode.labels.filter(label => !targetNode.labels.includes(label))
	if(extraLabels.length){
		targetNode.labels = targetNode.labels.concat(extraLabels)
	}
	return targetNode
}
