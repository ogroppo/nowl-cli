const compareObject = require('./compareObject')
const getAllNodes = require('./getAllNodes')

module.exports = function getNodes(filter, options = {}){
	var found = [];
	getAllNodes(options).forEach(node => {
		if(compareObject(node, filter)){
			found.push(node)
		}
	})
	return found
}
