const chalk = require('chalk')

const setPattern = require('../lib/setPattern')
const setNode = require('../lib/setNode')
const parseCliNode = require('../lib/parseCliNode')
const parseCliRel = require('../lib/parseCliRel')
const formatNode = require('../lib/formatNode')
const formatPattern = require('../lib/formatPattern')

exports.handler = function (argv) {
	let nodeToSet = parseCliNode(argv.node)
	var rel, child
	if(argv.rel){
		if(argv.child){
			rel = parseCliRel(argv.rel)
			child = parseCliNode(argv.child)
		}else{
			rel = {}
			child = parseCliNode(argv.rel)
		}
		setPattern(nodeToSet, rel, child).then(returnedPattern => {
			console.info(chalk.green("Pattern set!"))
			console.info()
			console.info(formatPattern(returnedPattern.node, returnedPattern.rel, returnedPattern.child))
			console.info()
		}).catch(e => console.info(e))
	}else{
		setNode(nodeToSet).then(returnedNode => {
			console.info(chalk.green("Node set!"))
			console.info()
			console.info(formatNode(returnedNode))
			console.info()
		}).catch(e => console.info(e))
	}
}

exports.builder = {
}
