const csv = require('fast-csv');
const path = require('path');
const getNodes = require('./getNodes');
const getRels = require('./getRels');
const compareNode = require('./compareNode');
const compareRel = require('./compareRel');

let domain = "../db/og-domain/";
let nodesFile = path.join(__dirname, domain, 'nodes.csv');
let relsFile = path.join(__dirname, domain, 'rels.csv');

module.exports = (nodeToDelete) =>
	new Promise(async (resolve, reject) => {
		nodeToDelete.alias = 'deletedNode';
		let {nodeCollection, deletedNode} = await getNodes({alias: 'nodeCollection'}, nodeToDelete)
		if(!deletedNode)
			return reject("Node to delete not found")

		nodeCollection = nodeCollection.filter(row => !compareNode(row, nodeToDelete))
		csv
		.writeToPath(nodesFile, nodeCollection)
		.on("finish", () => {
			getRels().then(relCollection => {
				relCollection = relCollection.filter(row =>
					!compareRel(row, {start: nodeToDelete.id}) && !compareRel(row, {end: nodeToDelete.id})
				)
				csv
				.writeToPath(relsFile, relCollection)
				.on("finish", () => {
					resolve(nodeToDelete);
				})
			})
		});
	})
