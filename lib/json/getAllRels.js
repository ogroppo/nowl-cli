const fs = require('fs');
const path = require('path');
const systemRelsPath = '../../data/json/rels.json';
const relsTestPath = '../../fixtures/rels.json';

module.exports = function getRels(filter = {}){
	let absPath = path.resolve(__dirname, systemRelsPath);
	if(filter.test)
		absPath = path.resolve(__dirname, nodesTestPath);


	if(!fs.existsSync(absPath)) {
    throw "System Rels DB does not exist: " + systemRelsPath
	}

	let jsonString = fs.readFileSync(absPath, 'utf8');
	if(!jsonString)
		throw "Rels DB is empty";

	try {
		let rels = JSON.parse(jsonString);
		return rels;
	} catch (e) {
		throw e
	}
}
