const csv = require('fast-csv');
const path = require('path');
const parseCsvNode = require('./parseCsvNode');
const getLabel = require('./getLabel');
const compareNode = require('./compareNode');
const isUniqueNode = require('./isUniqueNode');

let domain = "../db/default-csv-domain/";
let nodesFile = path.join(__dirname, domain, 'nodes.csv');
let nodeModel = require('../db/nodeModel')

module.exports = function getNode(nodeToGet){
	return new Promise((resolve, reject)=>{
		let nodeCollection = []
		let nodeIsUnique = isUniqueNode(nodeToGet)
		csv
		.fromPath(nodesFile, {headers: nodeModel})
		.on("data", row => {
			if(row.id === 'id') return;
			if(compareNode(row, nodeToGet)){
				let gettedNode = parseCsvNode(row)
				if(nodeIsUnique)
					resolve(gettedNode)
				else
					nodeCollection.push(gettedNode)
			}
		})
		.on("end", () => {
			if(nodeIsUnique)
				resolve(undefined)
			else
				resolve(nodeCollection)
		})
	})
}
