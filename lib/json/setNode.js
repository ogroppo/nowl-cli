const compareObject = require('./compareObject')
const getNodes = require('./getNodes')
const getNode = require('./getNode')
const updateNode = require('./updateNode')
const addNode = require('./addNode')

module.exports = function setNode(selector, options){
	if(selector.name){
		let nameNode = getNode({name: selector.name}, options);
		if(nameNode){
			if(compareObject(nameNode, selector))
				return nameNode

			return updateNode(selector, options)
		}
	}

	return addNode(selector, options)
}
