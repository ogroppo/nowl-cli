const compareObject = require('./compareObject')
const getAllRels = require('./getAllRels')

module.exports = function getRel(filter){
	let allRels = getAllRels(filter);
	for(let rel of allRels){
		if(compareObject(rel, filter)){
			return rel
		}
	}
}
