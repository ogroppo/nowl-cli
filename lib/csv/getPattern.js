const getNodes = require('./getNodes')
const getNode = require('./getNode')
const getRels = require('./getRels')
const compareNode = require('./compareNode')

module.exports = function getPattern(node, rel, child){
	return new Promise(async (resolve, reject)=>{
		let {returnedNodes} = await getNodes(node)

		let patterns = []
		for(let returnedNode of returnedNodes){
			rel.start = returnedNode.id
			rel.alias = 'candidateRels'
			let {candidateRels} = await getRels(rel)
			if(candidateRels)
				for(let candidateRel of candidateRels){
					let candidateChild = await getNode({id: candidateRel.end})
					if(compareNode(candidateChild, child)){
						patterns.push({
							node: returnedNode,
							rel: candidateRel,
							child: candidateChild
						})
					}
				}
		}

		resolve(patterns)
	})
}
