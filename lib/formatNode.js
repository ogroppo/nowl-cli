const chalk = require('chalk')
const formatLabels = require('./formatLabels')

module.exports = node => {
	let string = ''
	if (!node) return string

	if(node.id)
		string += chalk.grey(`(${node.id}) `)

	if(node.name)
		string += node.name

	string += formatLabels(node.labels)

	return string
}
