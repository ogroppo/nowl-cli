const setNode = require('./setNode')
const setRel = require('./setRel')

module.exports = async function setPattern(node, rel, child){
	let settedNode = await setNode(node)
	let settedChild = await setNode(child)

	if(node.labels){
		let patterns = []
		for (let nodeLabel of node.labels) {
			if(child.labels){
				for (let childLabel of child.labels) {
					let childRel = Object.assign({}, rel)
					childRel.start = settedNode.id
					childRel.end = settedChild.id
					childRel.startLabel = nodeLabel
					childRel.endLabel = childLabel
					let settedRel = await setRel(childRel)
					patterns.push({
						node: settedNode,
						rel: settedRel,
						child: settedChild
					})
				}
			}else{
				let childRel = Object.assign({}, rel)
				childRel.start = settedNode.id
				childRel.end = settedChild.id
				childRel.startLabel = nodeLabels
				let settedRel = await setRel(childRel)
				patterns.push({
					node: settedNode,
					rel: settedRel,
					child: settedChild
				})
			}
		}
		return patterns
	}else if(child.labels){
		let patterns = []
		for (let childLabel of child.labels) {
			let childRel = Object.assign({}, rel)
			childRel.start = settedNode.id
			childRel.end = settedChild.id
			childRel.endLabel = childLabel
			let settedRel = await setRel(childRel)
			patterns.push({
				node: settedNode,
				rel: settedRel,
				child: settedChild
			})
		}
		return patterns
	}else{
		rel.start = settedNode.id
		rel.end = settedChild.id
		let settedRel = await setRel(rel)
		return {
			node: settedNode,
			rel: settedRel,
			child: settedChild
		}
	}
}
