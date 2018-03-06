const {isString, isNotString, isArray, isObject} = require('isnot')

var getNodes = require('../json/getNodes');
var getNode = require('../json/getNode');
var setNode = require('../json/setNode');
var setParent = require('../json/setParent');
var getParents = require('../json/getParents');
var getParent = require('../json/getParent');

class FluentNowledge{
	constructor(config = {}){
		this.nodeType = config.nodeType;
		this.test = config.test;
		this.domain = config.domain;
		this.driver = config.driver;

		this.parts = [];
	}

	one(){
		let results = [];
		this.parts.forEach((part, index) => {
			if(part.query === 'get'){
				results.push(getNode(part.node, {test: this.test}))
			}
			if(part.query === 'set'){
				results.push(setNode(part.node, {test: this.test}))
			}
			if(part.query === 'of') {
				let previousNode = results[index - 1]
				if(!previousNode)
					return
				var parent
				if(this.parts[0].query === 'get'){
					parent = getParent(part.node, previousNode, {test: this.test})
				}
				if(this.parts[0].query === 'set'){
					parent = setParent(part.node, previousNode, {test: this.test})
				}
				if(!parent){
					results = []
					return
				}
				results.push(parent)
			}
		})

		return results[0];
	}

	all(){
		let resultMap = {};
		this.parts.forEach((part, partIndex) => {
			if(part.query === 'get'){
				let nodes = getNodes(part.node, {test: this.test})
				resultMap[partIndex] = nodes
			}
			if(part.query === 'of') {
				let previousNodes = resultMap[partIndex - 1]
				if(!previousNodes || !previousNodes.length)
					return

				previousNodes.forEach((previousNode, previousIndex)=>{
					let parent = getParent(part.node, previousNode, {test: this.test})
					if(!parent){
						previousNodes.splice(previousIndex, 1)
						return
					}
					resultMap[partIndex] = [parent]
				})
			}
		})

		return resultMap[0];
	}

	run(){
		this.one()
	}

	pattern(){
		let pattern = [];
		this.parts.forEach((part, index) => {
			if(part.query === 'get'){
				let node = getNode(part.node, {test: this.test})
				pattern.push(node)
			}
			if(part.query === 'of') {
				if(this.parts[0].query === 'get'){
					if(!pattern[index -1])
						return

					var parent = getParent(part.node, pattern[index - 1], {test: this.test})
					if(!parent){
						pattern = []
						return
					}
					pattern.push(parent)
				}
			}
		})

		return pattern
	}

	_parseArgs(...args){
		let node = {domain: this.domain};
		args.forEach((arg)=>{
			if(isString(arg))
				node.name = arg

			if(isArray(arg))
				node.labels = arg

			if(isObject(arg))
				Object.assign(node, arg)
		})
		node.type = this.nodeType

		if(!node.domain)
			throw "Content cannot be retrieved without domain"

		return node
	}

	of(...args){
		if(!this.parts.length)
			throw "Cannot call 'of' without a get/set"

		this.parts.push({
			query: 'of',
			node: this._parseArgs(...args)
		})

		return this
	}

	get(...args){
		if(this.parts.length)
			throw "Cannot call get multiple times"

		this.parts.push({
			query: 'get',
			node: this._parseArgs(...args)
		})

		return this
	}

	set(...args){
		if(this.parts.length)
			throw "Cannot call get multiple times"

		this.parts.push({
			query: 'set',
			node: this._parseArgs(...args)
		})

		return this
	}


}

module.exports = FluentNowledge
