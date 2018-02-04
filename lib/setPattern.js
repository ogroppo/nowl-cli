const setNode = require('./setNode')
const setRel = require('./setRel')

module.exports = async function setPattern(node, rel, child){
	let settedNode = await setNode(node)
	let settedChild = await setNode(child)
	rel.start = settedNode.id
	rel.end = settedChild.id
	let settedRel = await setRel(rel)

	return {
		node: settedNode,
		rel: settedRel,
		child: settedChild
	}
}
