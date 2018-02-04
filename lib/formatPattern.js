const chalk = require('chalk')
const formatNode = require('./formatNode')

module.exports = function formatPattern(node, rel, child){
	let string = formatNode(node)

	string += ' ='
	if(rel.id)
		string += chalk.grey(`(${rel.id})`)
	if(rel.name)
		string += rel.name

	if(!rel.id && !rel.name)
		string += '='

	string += '=> '

	string += formatNode(child)

	return string
}
