const getDb = require('./getDb');

module.exports = function getNode(selector, options){
	return getDb(options).then(db => {
		return db.collection('nodes').findOne(selector);
	});
}
