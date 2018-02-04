module.exports = function parseCsvNode(csvNode){
	let parsedNode = Object.assign({}, csvNode)

	parsedNode.labels = parsedNode.labels.split(',');

	for (let prop in parsedNode) {
		if(!parsedNode[prop])
			delete parsedNode[prop]
	}

	return parsedNode;
}
