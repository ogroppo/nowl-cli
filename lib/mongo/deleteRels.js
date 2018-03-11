module.exports = function deleteRels(db, selector = {}, options = {}){
	return db.collection('rels').deleteMany(selector);
}
