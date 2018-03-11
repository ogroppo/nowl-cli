const {isString, isArray, isObject} = require('isnot')

const isUnique = require('../isUnique')

const setNode = require('../mongo/setNode')
const setParent = require('../mongo/setParent')
const getParent = require('../mongo/getParent')

class FluentNowledge{
	constructor(config = {}){
		this.nodeType = config.nodeType;
		this.domain = config.domain;
		this.db = config.db;

		this.parts = [];
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

	async return(){
		let results = [];
		let verbStep = this.parts[0];
		for(let [partIndex, part] of this.parts.entries()){
			if(part.query === 'get'){
				let nodes = await this.db.collection('nodes').find(part.node).toArray();
				results.push(nodes)
			}
			if(part.query === 'set'){
				let node = await setNode(this.db, part.node);
				results.push([node])
			}
			if(part.query === 'of'){
				let previousResults = results[partIndex - 1];
				if(!previousResults.length)
					break;

				if(verbStep.query === 'set'){
					let parent = await setParent(this.db, part.node, previousResults[0]);
				}
				if(verbStep.query === 'get'){
					for(let [resultIndex, result] of previousResults.entries()){
						let parent = await getParent(this.db, part.node, result)
						if(!parent)
							previousResults.splice(resultIndex, 1)
					}
				}
			}
		}

		if(verbStep.query === 'get'){
			if(isUnique(verbStep.node))
				return results[0][0]
			return results[0]
		}

		if(verbStep.query === 'set')
			return results[0][0];
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
