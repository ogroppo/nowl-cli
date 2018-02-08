const chalk = require('chalk')

const parseCliNode = require('../lib/parseCliNode')
const parseCliRel = require('../lib/parseCliRel')
const getNode = require('../lib/getNode')
const getNodes = require('../lib/getNodes')
const getPattern = require('../lib/getPattern')
const formatNode = require('../lib/formatNode')
const formatPattern = require('../lib/formatPattern')

const pluralize = require('../helpers/pluralize')

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
				console.info(chalk.yellow("Pattern not found"))
				console.info();
				console.info(formatPattern({node: nodeToGet, rel: rel, child: child}, argv))
				console.info();
			}else{
				console.log(chalk.green(`${returnedPatterns.length} ${pluralize('pattern', returnedPatterns.length)}`))
				console.info()
				returnedPatterns.forEach(returnedPattern => {
					console.info(formatPattern({node: returnedPattern.node, rel: returnedPattern.rel, child: returnedPattern.child}, argv))
				})
				console.info();
			}
		}).catch(e => console.info(e))
	}else{
		if(nodeToGet.name || nodeToGet.id){
			getNode(nodeToGet).then(returnedNode => {
				if(!returnedNode){
					console.info(chalk.yellow("Not found"))
				}else{
					console.info(formatNode(returnedNode, argv))
				}
				console.log();
			}).catch(e => console.error(e))
		} else {
			getNodes(nodeToGet).then(({returnedNodes}) => {
				if(!returnedNodes){
					console.info(chalk.yellow("No results"))
					console.log();
				}else{
					console.log(chalk.green(`${returnedNodes.length} ${pluralize('result', returnedNodes.length)}`));
					console.log();
					returnedNodes.forEach(node => console.log(formatNode(node, argv)))
					console.log();
				}
			}).catch(e => console.error(e))
		}
	}
}

exports.builder = {
}
