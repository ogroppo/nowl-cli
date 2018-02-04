const csv = require('fast-csv')
const path = require('path')
const compareNode = require('./compareNode')
const parseCsvNode = require('./parseCsvNode')

let domain = "../db/og-domain/"
let nodesFile = path.join(__dirname, domain, 'nodes.csv')
let nodeModel = require('../db/nodeModel')

module.exports = (...nodesToGet) =>
	new Promise((resolve, reject)=>{
		var nodesCollection = [], selectedNodes = {}
		csv
			.fromPath(nodesFile, {headers: nodeModel})
			.on("data", row => {
				if(row.id === 'id') return
				if(nodesToGet.length){
					nodesToGet.forEach(nodeToGet => {
						if(compareNode(row, nodeToGet)){
							nodeToGet.alias = nodeToGet.alias || 'returnedNodes'
							selectedNodes[nodeToGet.alias] = selectedNodes[nodeToGet.alias] || []
							selectedNodes[nodeToGet.alias].push(parseCsvNode(row))
						}
					})
				}else{
					nodesCollection.push(row)
				}
			})
			.on("end", function(){
				if(nodesToGet.length)
					resolve(selectedNodes)
				else
					resolve(nodesCollection)
			})
	})
