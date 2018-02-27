const getNode = require('./getNode')
const updateNode = require('./updateNode')
const addNode = require('./addNode')

module.exports = function setNode(nodeToSet){
	return new Promise((resolve, reject)=>{
		if(nodeToSet.name){
			getNode({name: nodeToSet.name}).then(gettedNode => {
				if(gettedNode){
					let updatedNode = nodeNeedsUpdate(gettedNode, nodeToSet)
					if(updatedNode){
						return updateNode(updatedNode).then(done => resolve(updatedNode))
					}
					resolve(gettedNode)
				} else {
					addNode(nodeToSet).then(addedNode => {
						addedNode.isNew = true
						resolve(addedNode)
					})
				}
			}).catch(e => console.log(e))
		} else {
			addNode(nodeToSet).then(addedNode => {
				addedNode.isNew = true
				resolve(addedNode)
			}).catch(e => console.log(e))
		}
	})
}

function nodeNeedsUpdate(originalNode, nodeToSet){
	let updatedNode = Object.assign({}, originalNode)
	let shouldUpdate = false
	if(nodeToSet.labels){
		originalNode.labels = originalNode.labels || []
		let extraLabels = nodeToSet.labels.filter(label => !originalNode.labels.includes(label))
		if(extraLabels.length){
			updatedNode.labels = originalNode.labels.concat(extraLabels)
			shouldUpdate = true
			//return new labels for highlighting?
		}
	}

	if(nodeToSet.date && nodeToSet.date !== originalNode.date){
		updatedNode.date = nodeToSet.date
		shouldUpdate = true
	}

	if(nodeToSet.value && nodeToSet.value !== originalNode.value){
		updatedNode.value = nodeToSet.value
		shouldUpdate = true
	}

	if(nodeToSet.place && nodeToSet.place !== originalNode.place){
		updatedNode.place = nodeToSet.place
		shouldUpdate = true
	}

	if(nodeToSet.url && nodeToSet.url !== originalNode.url){
		updatedNode.url = nodeToSet.url
		shouldUpdate = true
	}

	if(shouldUpdate)
		return updatedNode;
}
