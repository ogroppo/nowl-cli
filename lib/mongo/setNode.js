const compareObject = require('../compareObject')

module.exports = async function setNode(db, selector, options){
	if(selector.name){
		let node = await db.collection('nodes').findOne({name: selector.name, domain: selector.domain})
		if(node){
			if(!compareObject(node, selector)){
				let update = {
					$set: { updatedAt: new Date }
				};
				if(selector.labels)
					update.$addToSet = { labels: { $each: selector.labels } }

				let updated = await db.collection('nodes').findOneAndUpdate(
					node,
					update,
					{
						returnOriginal: false
					}
				).value
				return updated
			}
			return node
		}
	}

	let insertResult = await db.collection('nodes').insertOne(selector)
	return insertResult.ops[0];
}
