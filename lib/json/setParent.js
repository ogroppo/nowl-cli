const setNode = require('./setNode')
const setRel = require('./setRel')

module.exports = function setParent(parentSelector, node, options = {}){

	let parent = setNode(parentSelector, options)
	let rel = setRel({
		type: 'has',
		start: parent.id,
		end: node.id
	}, options)
	parent.rel = rel
	return parent
}
