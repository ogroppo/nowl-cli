module.exports = function deleteNodes(db, selector = {}, options = {}){
	return db.collection('nodes').deleteMany(selector);
}
