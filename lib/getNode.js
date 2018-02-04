const csv = require('fast-csv');
const path = require('path');
const parseCsvNode = require('./parseCsvNode');
const getLabel = require('./getLabel');
const compareNode = require('./compareNode');

let domain = "../db/og-domain/";
let nodesFile = path.join(__dirname, domain, 'nodes.csv');
let nodeModel = require('../db/nodeModel')

module.exports = (nodeToGet) =>
	new Promise((resolve, reject)=>{
		csv
		.fromPath(nodesFile, {headers: nodeModel})
		.on("data", row => {
			if(compareNode(row, nodeToGet)){
				let gettedNode = parseCsvNode(row)
				resolve(gettedNode)
			}
		})
		.on("end", () => {
			resolve(undefined);
		})
	})
