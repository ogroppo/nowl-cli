const csv = require('fast-csv')
const path = require('path')
const getNode = require('./getNode')
const calcId = require('./calcId')

let domain = "../db/default-csv-domain/"
let nodesFile = path.join(__dirname, domain, 'nodes.csv')
let nodeModel = require('../db/nodeModel')

module.exports = function addNode(nodeToAdd){
	return new Promise((resolve, reject)=>{
		getNode({}).then(nodesCollection => {
			nodeToAdd.id = calcId(nodesCollection)
			nodeToAdd.createdAt = new Date().toISOString()
			nodesCollection.push(nodeToAdd)

			csv
			.writeToPath(nodesFile, nodesCollection, { headers: nodeModel })
			.on("finish", function(){
				resolve(nodeToAdd)
			})
		}).catch(e=>console.info(e))
	})
}
