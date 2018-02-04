const chalk = require('chalk')

const parseCliNode = require('../lib/parseCliNode')
const parseCliRel = require('../lib/parseCliRel')
const changeNode = require('../lib/changeNode')

exports.handler = function (argv) {
	let nodeToChange = parseCliNode(argv.oldnode)
	let nodeWithChanges = parseCliNode(argv.newnode)
	changeNode(nodeToChange, nodeWithChanges).then(changedNode => {
		console.info(chalk.green('Node changed!'))
		console.info()
		console.info(nodeToChange.name, '->', changedNode.name)
		console.info()
	}).catch(e => {
		console.info(chalk.red(e))
		console.info()
	})
}

exports.builder = {
}
