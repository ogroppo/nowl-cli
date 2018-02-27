const compareObject = require('./compareObject')
const getAllNodes = require('./getAllNodes')

module.exports = function getNode(filter, options = {}){
	let allNodes = getAllNodes(options);
	for(let node of allNodes){
		if(compareObject(node, filter)){
			return node
		}
	}
}
