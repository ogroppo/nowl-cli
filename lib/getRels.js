const csv = require('fast-csv')
const path = require('path')
const compareRel = require('./compareRel')

let domain = "../db/default-csv-domain/"
let relsFile = path.join(__dirname, domain, 'rels.csv')
let relModel = require('../db/relModel')

module.exports = function getRels(...relsToGet){
	return new Promise((resolve, reject)=>{
		var relsCollection = [], selectedRels = {};
		csv
			.fromPath(relsFile, {headers: relModel})
			.on("data", row => {
				if(relsToGet.length){
					relsToGet.forEach((rel)=>{
						if(compareRel(row, rel)){
							selectedRels[rel.alias] = selectedRels[rel.alias] || []
							selectedRels[rel.alias].push(row)
						}
					})
				}else {
					relsCollection.push(row)
				}
			})
			.on("end", () => {
				if(relsToGet.length)
					resolve(selectedRels)
				else
					resolve(relsCollection)
			})
	})
}
