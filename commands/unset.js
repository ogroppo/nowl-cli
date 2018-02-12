const chalk = require('chalk')

const parseCliNode = require('../lib/parseCliNode')
const formatNode = require('../lib/formatNode')
const unsetNode = require('../lib/unsetNode')

exports.handler = function unset(argv) {
	let nodeToUnset = parseCliNode(argv.node)
	unsetNode(nodeToUnset).then(unsettedNode => {
		if(!unsetNode){
			console.info(chalk.yellow("Not found"))
		}else{
			console.info(formatNode(unsettedNode, argv))
		}
		console.info()
	}).catch(e => {
		console.info(chalk.red(e))
		console.info()
	})
}

exports.builder = {}
