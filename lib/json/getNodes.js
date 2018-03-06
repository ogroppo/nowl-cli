const compareObject = require('./compareObject')
const getAllNodes = require('./getAllNodes')

module.exports = function getNodes(selector, options = {}){
	var found = [];
	getAllNodes(options).forEach(node => {
		if(compareObject(node, selector)){
			found.push(node)
		}
	})
	return found
}
