const chalk = require('chalk')
const {isArray} = require('isnot')

const setPattern = require('../lib/setPattern')
const setNode = require('../lib/setNode')
const parseCliNode = require('../lib/parseCliNode')
const parseCliRel = require('../lib/parseCliRel')
const formatNode = require('../lib/formatNode')
const formatPattern = require('../lib/formatPattern')

exports.handler = function (argv) {
	let nodeToSet = parseCliNode(argv.node)
	nodeToSet.domain = argv.domain
	var rel, child
	if(argv.rel){
		if(argv.child){
			rel = parseCliRel(argv.rel)
			child = parseCliNode(argv.child)
		}else{
			rel = {}
			child = parseCliNode(argv.rel)
		}
		setPattern(nodeToSet, rel, child).then(setPatternResult => {
			if(isArray(setPatternResult)){
				setPatternResult.forEach((pattern)=>{
					console.info(formatPattern({node: pattern.node, rel: pattern.rel, child: pattern.child}, argv))
				})
			}else{
				console.info(formatPattern({node: setPatternResult.node, rel: setPatternResult.rel, child: setPatternResult.child}, argv))
			}
			console.info()
		}).catch(e => console.info(e))
	}else{
		setNode(nodeToSet, argv).then(returnedNode => {
			console.info(formatNode(returnedNode, argv))
			console.info()
		}).catch(e => console.info(e))
	}
}

exports.builder = {}
