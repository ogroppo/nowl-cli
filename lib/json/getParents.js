const compareObject = require('./compareObject')
const getAllRels = require('./getAllRels')
const getNode = require('./getNode')

module.exports = function getParents(parentNodeSelector, node, options = {}){
	let allRels = getAllRels(options)
	let parents = []
	for(let rel of allRels){
		if(compareObject(rel, {end: node.id})){
			let parent = getNode({id: rel.start}, options)
			if(compareObject(parent, parentNodeSelector)){
				parent.rel = rel
				parents.push(parent)
			}
		}
	}
	return parents
}
