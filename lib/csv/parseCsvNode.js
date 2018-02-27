const {isNotEmptyString} = require('isnot')

module.exports = function parseCsvNode(csvNode){
	let parsedNode = Object.assign({}, csvNode)

	if(isNotEmptyString(parsedNode.labels))
		parsedNode.labels = parsedNode.labels.split(',');

	for (let prop in parsedNode) {
		if(!parsedNode[prop])
			delete parsedNode[prop]
	}

	return parsedNode;
}
