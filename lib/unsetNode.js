const csv = require('fast-csv')
const path = require('path')
const getNodes = require('./getNodes')
const compareNode = require('./compareNode')
const parseCsvNode = require('./parseCsvNode')

let domain = "../db/default-csv-domain/"
let nodesFile = path.join(__dirname, domain, 'nodes.csv')
let nodeModel = require('../db/nodeModel')

module.exports = function unsetNode(nodeToUnset){
	return new Promise((resolve, reject) => {
		getNodes().then(nodesCollection => {
			let updatedNode
			nodesCollection = nodesCollection.map(row => {
				if(compareNode(row, nodeToUnset)){
					let node = parseCsvNode(row);
					row.labels = node.labels.filter(label => !nodeToUnset.labels.includes(label))
					row.updatedAt = new Date().toISOString()
					updatedNode = row
				}
				return row
			})

			csv
			.writeToPath(nodesFile, nodesCollection, {headers: nodeModel})
			.on("finish", function(){
				if(updatedNode)
					resolve(updatedNode)
				else
					reject()

			})
		}).catch(e=>console.log(e))
	})
}
