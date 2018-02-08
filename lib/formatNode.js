const chalk = require('chalk')
const formatLabels = require('./formatLabels')

module.exports = function formatNode(node, options = {}){
	let string = ''
	if (!node) return string

	if(node.id && options.verbose){
		if(node.isNew)
			string += chalk.green(`(${node.id})`)
		else
			string += chalk.grey(`(${node.id})`)
	}

	if(node.name){
		if(node.isRoot)
			string += chalk.bold(node.name)
		else
			string += node.name
	}

	string += formatLabels(node.labels)

	return string
}
