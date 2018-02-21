const chalk = require('chalk')
const formatLabels = require('./formatLabels')
const formatDate = require('./formatDate')

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
		//if(node.isRoot)
		//string += chalk.bold(node.name) // :( too hard for now
		string += node.name
	}

	string += formatLabels(node.labels)

	if(node.date)
		string += ' date: ' + formatDate(node.date)

	if(node.value)
		string += ' value: ' + node.value

	if(node.place)
		string += ' place: ' + node.place

	if(node.url)
		string += ' url: ' + node.url

	if(options.verbose > 2){
		if(node.createdAt)
			string += '\n\tcreated ' + formatDate(node.createdAt)
		if(node.updatedAt)
			string += '\n\tupdated ' + formatDate(node.updatedAt)
	}

	return string
}
