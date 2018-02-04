const csv = require('fast-csv')
const path = require('path')
const getNodes = require('./getNodes')
const compareNode = require('./compareNode')

let domain = "../db/og-domain/"
let nodesFile = path.join(__dirname, domain, 'nodes.csv')
let nodeModel = require('../db/nodeModel')

module.exports = function updateNode(nodeToUpdate){
	return new Promise((resolve, reject) => {
		getNodes().then(nodesCollection => {
			let updatedNode
			nodesCollection = nodesCollection.map(row => {
				if(compareNode(row, nodeToUpdate)){
					row = nodeToUpdate
					row.updatedAt = new Date().toISOString()
					updatedNode = row
				}
				return row
			})

			csv
			.writeToPath(nodesFile, nodesCollection)
			.on("finish", function(){
				if(updatedNode)
					resolve(updatedNode)
				else
					reject()

			})
		}).catch(e=>console.log(e))
	})
}
