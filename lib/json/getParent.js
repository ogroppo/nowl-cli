const compareObject = require('./compareObject')
const getAllRels = require('./getAllRels')
const getNode = require('./getNode')

module.exports = function getParent(parentNodeSelector, childNode, options = {}){
	let parentNode = getNode(parentNodeSelector, options);
	if(!parentNode)
		return;

	let allRels = getAllRels(options)
	let parents = []
	for(let rel of allRels){
		if(compareObject(rel, {start: parentNode.id, end: childNode.id})){
			parentNode.rel = rel
			return parentNode
		}
	}
}
