const chalk = require('chalk')

const parseCliNode = require('../lib/parseCliNode')
const deleteNode = require('../lib/deleteNode')
const formatNode = require('../lib/formatNode')

exports.handler = function deleteCommand(argv) {
	let nodeToDelete = parseCliNode(argv.node)
	deleteNode(nodeToDelete).then(deletedNode => {
		console.info(chalk.green("Node deleted!"))
		console.info()
		console.info(formatNode(deletedNode))
		console.info()
	}).catch(e => {
		console.info(chalk.red(e))
		console.info()
	})
}

exports.builder = {}
