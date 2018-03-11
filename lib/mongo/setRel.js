module.exports = async function setRel(db, selector){
	let rel = await db.collection('rels').findOne(selector)
	if(rel)
		return rel

	let insertResult = await db.collection('rels').insertOne(selector)
	return insertResult.ops[0];
}
