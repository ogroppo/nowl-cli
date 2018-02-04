const chalk = require('chalk')
const asciiGraph = require('ascii-graph')

const parseCliNode = require('../lib/parseCliNode')
const deleteNode = require('../lib/deleteNode')
const formatNode = require('../lib/formatNode')
const graphNode = require('../lib/graphNode')

exports.handler = function graphCommand(argv) {
	let nodeToGraph = parseCliNode(process.argv[3])
	graphNode(nodeToGraph).then(jsonGraph => {
		//console.log(JSON.stringify(jsonGraph, null, 2))
		asciiGraph(jsonGraph)
	}).catch(e => console.info(e))
}

exports.builder = {}
