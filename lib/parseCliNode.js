const {isNotString} = require('isnot')

module.exports = function parseCliNode(rawNode){
	if(isNotString(rawNode))
		throw "Node to parse must be string"

	let node = {}

	let pieces = rawNode.split("[")
	let nodeName = pieces.shift()
	if(nodeName)
		node.name = nodeName

	pieces.forEach((label, index) => {
		label = removeLastChar(label, "]")
		if(!label)
			return

		node.labels = node.labels || []
		node.labels.push(label)
	})
	return node;
}

function removeLastChar(string, char){
	if(string.substring(string.length - 1) === char)
		return string.substring(0, string.length-1);

	return string;
}
