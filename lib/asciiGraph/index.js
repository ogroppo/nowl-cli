var mapChildren = require('./mapChildren')
var mapParents = require('./mapParents')
var addToMap = require('./addToMap')
var calcNodeWidth = require('./calcNodeWidth')
var mapGraphToRowGraph = require('./mapGraphToRowGraph')

var formatNode = require('../formatNode')

function asciiGraph(levelGraph, options){
	var mapGraph = levelGraphToMapGraph(levelGraph, options)
	//console.log(mapGraph)
	var rowGraph = mapGraphToRowGraph(mapGraph)
	//console.log(rowGraph)
	drawRowGraph(rowGraph)
}

module.exports = asciiGraph

function levelGraphToMapGraph(levelGraph, options = {}){

	let root = levelGraph.root
	root.node.isRoot = true
	root.display = formatNode(root.node, options)
	//root.width = calcNodeWidth(root.node)
	root.row = 0
	root.left = 0
	let map = {
		0: levelGraph.root
	}

	mapParents(map, levelGraph.parents)
	mapChildren(map, levelGraph.children)

	return map
}

function drawRowGraph(rowGraph){
	var lines = []
	for (var line of rowGraph) {
		lines.push(buildLine(line))
	}
	console.log(lines.join('\n'))
	console.log()
}

function buildLine(lineObject = []){
	let line = ''
	lineObject.forEach((connector)=>{
		if(line.length < connector.left)
			line += ' '.repeat(connector.left - line.length)

		line = line.slice(0, connector.left) + connector.display + line.slice(connector.left + connector.display.length)
	})
	return line
}

//																						 ┌-> ziooo
//				 						             ┌-> ssdfsc -┤
// 				 paren [p]-┐						 |					 └-> naltro
//  s	-┐						 |						 |           								 ┌-> ciic
//	c	-┼-> d [ladro]-┼-> the root -┼-> figlioccio ---> pastoo -┤
//	x	-┘             |						 |													 └-> ytf
//				 serpe [x]-┘						 └-> pane
