const MongoClient = require('mongodb').MongoClient;

module.exports = function getDb(options){
	const url = 'mongodb://localhost:27017';
	return MongoClient.connect(url).then(client => {
		const db = client.db(options.test?'test':'nowl');
		return db;
	})
}
