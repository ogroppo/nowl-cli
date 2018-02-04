const csv = require('fast-csv');
const path = require('path');

const compareRel = require('./compareRel');

let domain = "../db/og-domain/";
let relsFile = path.join(__dirname, domain, 'rels.csv');
let relModel = require('../db/relModel')

module.exports = (relToGet) =>
	new Promise((resolve, reject)=>{
		csv
		.fromPath(relsFile, {headers: relModel})
		.on("data", row => {
			if(compareRel(row, relToGet)){
				resolve(row)
			}
		})
		.on("end", () => {
			resolve(undefined);
		})
	})
