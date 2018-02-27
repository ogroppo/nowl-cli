const chalk = require('chalk')
const {isArray} = require('isnot')

const parseCliNode = require('$lib/parseCliNode')
const parseCliRel = require('$lib/parseCliRel')
const getNode = require('$lib/csv/getNode')
const getPattern = require('$lib/csv/getPattern')
const formatNode = require('$lib/formatNode')
const formatPattern = require('$lib/formatPattern')

const pluralize = require('$helpers/pluralize')

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
		getNode(nodeToGet).then(getNodeResult => {
			if(isArray(getNodeResult)){
				if(!getNodeResult.length){
					console.info(chalk.yellow("No results"))
				}else{
					console.log(chalk.green(`${getNodeResult.length} ${pluralize('result', getNodeResult.length)}`))
					console.log()
					getNodeResult.forEach(node => console.log(formatNode(node, argv)))
				}
			}else{
				if(!getNodeResult){
					console.info(chalk.yellow("Not found"))
				}else{
					console.info(formatNode(getNodeResult, argv))
				}
			}
			console.log();
		}).catch(e => console.error(e))
	}
}

exports.builder = {
}
