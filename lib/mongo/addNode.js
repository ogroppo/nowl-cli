const getDb = require('./getDb');

module.exports = function addNode(selector, options){
	return getDb(options).then(db => {
		return db.collection('nodes').insertOne(selector);
	});
}
