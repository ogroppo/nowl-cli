const getRel = require('./getRel')
const addRel = require('./addRel')

module.exports = function setRel(relSelector, options){
	let rel = getRel(relSelector, options);
	if(rel){
		return rel
	}

	return addRel(relSelector, options)
}
