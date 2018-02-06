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
		console.info(chalk.green('Your Tree'), `in ${getDateDiffSeconds(startDate)}s`);
		//console.log(JSON.stringify(jsonGraph, null, 2))
		asciiGraph(jsonGraph)
	}).catch(e => console.info(e))
}

exports.builder = {}

function getDateDiffSeconds(startDate){
	return ((new Date - startDate) / 1000).toFixed(1)
}
