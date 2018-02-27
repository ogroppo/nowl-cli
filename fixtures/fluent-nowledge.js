const {isString, isNotString, isArray, isObject} = require('isnot')

class FluentNowledge{
	constructor(config = {}){
		this.type = config.type;
		this.domain = config.domain;
		this.driver = config.driver;
		this.parts = [];
	}

	userCan(operation){
		const userNode = {id: this.userId, label: "User", type: "system"}
		const domainNode = {name: this.domain, label: "Domain", type: 'system'}
		this.match(this._pattern(userNode, {type: `can ${operation}`}, domainNode))
	}

	node(){
		if(this.driver === 'json'){
			if(this.parts[0].query === 'get'){
				var getNode = require('../lib/json/getNode');
				return getNode(this.parts[0].node)
			}
			if(this.parts[0].query === 'set'){
				var setNode = require('../lib/json/setNode');
				return setNode(this.parts[0].node)
			}
		}
	}

	get(...args){
		let name, labels = [], props = {};
		args.forEach((arg)=>{
			if(isString(arg))
				name = arg

			if(isArray(arg))
				labels = arg

			if(isObject(arg))
				props = arg
		})


		let node = Object.assign(
			{name: name, labels: labels, domain: this.domain},
			props,
			{type: this.type}
		)

		if(isNotString(node.domain))
			throw "Content cannot be retrieved without domain"

		this.parts.push({
			query: 'get',
			node: node
		})

		return this
	}

	set(...args){
		let name, labels = [], props = {};
		args.forEach((arg)=>{
			if(isString(arg))
				name = arg

			if(isArray(arg))
				labels = arg

			if(isObject(arg))
				props = arg
		})

		let node = Object.assign(
			{name: name, labels: labels, domain: this.domain},
			props,
			{type: this.type}
		)

		this.parts.push({
			query: 'set',
			node: node
		})

		return this
	}

	searchContent(contentName){
		this.userCan("read")
		this.matchNode()
		this.wherePropRegexp({name: contentName})
	}

	has(contentNode, options = {}){
		let _contentNode = Object.assign({domain: this.domain}, contentNode, {type: 'content'})

		this.userCan("write")
		this.mergeChild(_contentNode, {rel: {type: "has", startLabel: this.currentLabel, endLabel: _contentNode.label} })
	}

	of(contentNode, options = {}){
		let _contentNode = Object.assign({domain: this.domain}, contentNode, {type: 'content'})

		this.userCan("write")
		this.mergeParent(_contentNode, {rel: {type: "has"} })
	}

	label(...args){
		let _labelProps = {
			domain: this.domain
		}
		let _labelName
		args.forEach((arg)=>{
			if(isString(arg))
				_labelName = arg

			if(isObject(arg))
				_labelProps = Object.assign(_labelProps, arg, {type: "label"})

		})

		if(!_labelName)
			throw "Labels need name to be created"

		this.mergeNode(Object.assign({name: _labelName}, _labelProps))
	}

	is(label, options = {}){

		this.userCan("write")
		this.mergeParent(labelNode, {rel: {type: "can", name: "be"} })
	}

	canBe(label, options = {}){

		this.userCan("write")
		this.mergeChild(labelNode, {rel: {type: "can", name: "be"} })
	}

	canHaveEither(...labels){ //can have xor

		this.userCan("write")
		this.mergeParent(labelNode, {rel: {type: "can", name: "have either"} })
	}

	mustHaveEither(...labels){ //must have xor

		this.userCan("write")
		this.mergeParent(labelNode, {rel: {type: "must", name: "have either"} })
	}

	mustBeOf(label){ //must have parent label, but no contraints on parent?!

		this.userCan("write")
		this.mergeChild(labelNode, {rel: {type: "must", name: "be of"} })
	}

	mustBeOfType(label){ //must have parent type

		this.userCan("write")
		this.mergeChild(labelNode, {rel: {type: "must", name: "be of type"} })
	}

	mustHaveType(label){ //must have child type

		this.userCan("write")
		this.mergeChild(labelNode, {rel: {type: "must", name: "have type"} })
	}

	mustHave(label){ //must have child label

		this.userCan("write")
		this.mergeChild(labelNode, {rel: {type: "must", name: "have"} })
	}
}

module.exports = FluentNowledge
