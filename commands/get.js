const chalk = require('chalk')

const parseCliNode = require('../lib/parseCliNode')
const parseCliRel = require('../lib/parseCliRel')
const getNode = require('../lib/getNode')
const getNodes = require('../lib/getNodes')
const getPattern = require('../lib/getPattern')
const formatNode = require('../lib/formatNode')
const formatPattern = require('../lib/formatPattern')

exports.handler = function (argv) {
	let nodeToGet = parseCliNode(argv.node)
	var rel, child
	if(argv.rel){
		if(argv.child){
			rel = parseCliRel(argv.rel)
			child = parseCliNode(argv.child)
		}else{
			rel = {}
			child = parseCliNode(argv.rel)
		}
		getPattern(nodeToGet, rel, child).then(returnedPatterns => {
			if(!returnedPatterns.length){
				console.info(chalk.yellow("Pattern not found:"))
				console.info();
				if(rel)
					console.info(formatPattern(nodeToGet, rel, child))
				else
					console.info(formatPattern(nodeToGet, {}, child))
				console.info();
			}else{
				console.info(chalk.green(`${returnedPatterns.length} pattern(s) found!`))
				console.info();
				returnedPatterns.forEach(returnedPattern => {
					console.info(formatPattern(returnedPattern.node, returnedPattern.rel, returnedPattern.child))
				})
				console.info();
			}
		}).catch(e => console.info(e))
	}else{
		if(nodeToGet.name || nodeToGet.id){
			getNode(nodeToGet).then(returnedNode => {
				if(!returnedNode){
					console.info(chalk.yellow("Not found:"), argv.node)
				}else{
					console.info(chalk.green("Found!"), returnedNode.name)
				}
				console.log();
			}).catch(e => console.error(e))
		} else {
			getNodes(nodeToGet).then(({returnedNodes}) => {
				if(!returnedNodes){
					console.info(chalk.yellow("No results for"), argv.node)
					console.log();
				}else{
					console.log(chalk.green(`${returnedNodes.length} result(s) for`), argv.node);
					console.log();
					returnedNodes.forEach(node => console.log(formatNode(node)))
					console.log();
				}
			}).catch(e => console.error(e))
		}
	}
}

exports.builder = {
}
