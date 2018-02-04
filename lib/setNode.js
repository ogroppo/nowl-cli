const csv = require('fast-csv')
const path = require('path')
const getNode = require('./getNode')
const getNodes = require('./getNodes')
const parseCsvNode = require('./parseCsvNode')
const updateNode = require('./updateNode')
const calcId = require('./calcId')
const addLabel = require('./addLabel')

let domain = "../db/og-domain/"
let nodesFile = path.join(__dirname, domain, 'nodes.csv')
let nodeModel = require('../db/nodeModel')

module.exports = function setNode(nodeToSet){
	return new Promise((resolve, reject)=>{
		if(nodeToSet.name){
			getNode({name: nodeToSet.name}).then(gettedNode => {
				if(gettedNode){
					let updatedNode = nodeNeedsUpdate(gettedNode, nodeToSet)
					if(updatedNode){
						updateNode(updatedNode).then(done => resolve(updatedNode))
					}
					resolve(gettedNode)
				} else {
					addNode(nodeToSet).then(addedNode => resolve(addedNode))
				}
			})
		} else {
			addNode(nodeToSet).then(addedNode => resolve(addedNode))
		}
	})
}

function nodeNeedsUpdate(originalNode, nodeToSet){
	if(nodeToSet.labels){
		let extraLabels = nodeToSet.labels.filter(label => !originalNode.labels.includes(label))
		if(extraLabels.length){
			originalNode.labels = originalNode.labels.concat(extraLabels)
			return originalNode
		}
	}
	//props?? conflict?!
}

function addNode(nodeToAdd){
	return new Promise((resolve, reject)=>{
		getNodes().then(nodesCollection => {
			let setHeaders = nodesCollection.length ? false : nodeModel

			nodeToAdd.id = calcId(nodesCollection)
			nodeToAdd.createdAt = new Date().toISOString()
			nodesCollection.push(nodeToAdd)

			csv
			.writeToPath(nodesFile, nodesCollection, { headers: setHeaders })
			.on("finish", function(){
				resolve(nodeToAdd)
			})
		}).catch(e=>console.info(e))
	})
}
