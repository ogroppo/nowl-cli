const chalk = require('chalk')
const formatNode = require('./formatNode')
const formatRel = require('./formatRel')

module.exports = function formatPattern(pattern, options){
	if(pattern.rel && pattern.rel.startLabel)
		pattern.node.labels = [pattern.rel.startLabel]

	let string = formatNode(pattern.node, options)

	string += formatRel(pattern.rel, options)

	if(pattern.rel && pattern.rel.endLabel)
		pattern.child.labels = [pattern.rel.endLabel]

	string += formatNode(pattern.child, options)

	return string
}
