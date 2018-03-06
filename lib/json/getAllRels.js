const fs = require('fs');
const path = require('path');

const settings = require('../../settings');

module.exports = function getAllRels(options = {}){

	let path = options.test ? settings.relsTestPath : settings.relsPath
	if(!fs.existsSync(path)) {
		throw "System Nodes DB does not exist: " + path
	}

	let jsonString = fs.readFileSync(path, 'utf8');
	if(!jsonString)
		throw "Rels DB is empty";

	try {
		let rels = JSON.parse(jsonString);
		return rels;
	} catch (e) {
		throw e
	}
}
