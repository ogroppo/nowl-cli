const chalk = require('chalk')
const asciiGraph = require('../lib/asciiGraph')

const parseCliNode = require('../lib/parseCliNode')
const deleteNode = require('../lib/deleteNode')
const formatNode = require('../lib/formatNode')
const graphNode = require('../lib/graphNode')

exports.handler = function graphCommand(argv) {
	let startDate = new Date
	let rootNode = parseCliNode(argv.node)
	graphNode(rootNode).then(jsonGraph => {
		//console.log(JSON.stringify(jsonGraph, null, 2))
		if(!jsonGraph){
			console.log(chalk.yellow("Graph not found for"), argv.node);
			console.log();
		}else{
			asciiGraph(jsonGraph, argv)
		}
	}).catch(e =>
		console.info(e)
	)
}

exports.builder = {}

function getDateDiffSeconds(startDate){
	return ((new Date - startDate) / 1000).toFixed(1)
}
