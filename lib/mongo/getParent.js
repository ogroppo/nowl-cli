module.exports = async function getParent(db, parentSelector, node){
	let rels = await db.collection('rels').find({end: node._id}).toArray()
	for(let [relIndex, rel] of rels.entries()){
		let query = Object.assign({}, parentSelector, {_id: rel.start});
		if(query.labels)
			query.labels = {$in: query.labels};
		let parent = await db.collection('nodes').findOne(query);
		if(parent)
			return parent
	}
}
