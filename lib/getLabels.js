const csv = require('fast-csv');
const path = require('path');

let domain = "../db/og-domain/";
let labelsFile = path.join(__dirname, domain, 'labels.csv');
let labelModel = require('../db/labelModel')

module.exports = () =>
	new Promise((resolve, reject) => {
		var labelsCollection = [];
		csv
			.fromPath(labelsFile, {headers: labelModel})
			.on("data", function(row){
				labelsCollection.push(row);
			})
			.on("end", function(){
				resolve({labelsCollection: labelsCollection});
			})
	})
