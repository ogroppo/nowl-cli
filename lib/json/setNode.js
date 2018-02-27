const compareObject = require('./compareObject')
const getNodes = require('./getNodes')
const getNode = require('./getNode')

module.exports = function setNode(selector){
	if(selector.name){
		let nameNode = getNode({name: selector.name});
		if(nameNode){
			if(compareObject(nameNode, selector))
				return nameNode

			return updateNode(selector)
		}
	}

	return addNode(selector)
}
