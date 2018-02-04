const csv = require('fast-csv');
const path = require('path');
const getRels = require('./getRels');

let domain = "../db/og-domain/";
let relsFile = path.join(__dirname, domain, 'rels.csv');
let relModel = require('../db/relModel')

module.exports = rel =>
	new Promise((resolve, reject)=>{
		getRels().then(relsCollection => {
			let returnedRel;
			relsCollection = relsCollection.map(row => {
				if(row.id == rel.id){
					row = rel
					row.updatedAt = new Date().toISOString()
					returnedRel = row
				}
				return row;
			})
			csv
			.writeToPath(relsFile, relsCollection)
			.on("finish", function(){
				resolve(returnedRel);
			});
		}).catch(e=>console.log(e))
	})
