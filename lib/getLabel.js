const csv = require('fast-csv');
const path = require('path');

let domain = "../db/og-domain/";
let labelsFile = path.join(__dirname, domain, 'labels.csv');
let labelModel = require('../db/labelModel')

module.exports = (labelToGet) =>
	new Promise((resolve, reject)=>{
		csv
		.fromPath(labelsFile, {headers: labelModel})
		.on("data", function(row){
			if(labelToGet.id == row.id || row.name === labelToGet.name){
				let gettedLabel = row
				resolve(gettedLabel)
			}
		})
		.on("end", function(){
			resolve(undefined);
		})
	})
