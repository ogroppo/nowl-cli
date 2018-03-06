const nodeModel = require('./nodeModel')

module.exports = Object.assign(nodeModel, {
	"labels": {
		type: 'Array'
	},
	"date": {
		type: 'ISOString'
	}
	"value": {
		type: 'Number'
	}
	"place": {
		type: 'Coordinate'
	},
	"url": {
		type: 'URL'
	},
	"createdBy": {
		type: 'UUID'
	}
	"updatedBy": {
		type: 'UUID'
	}
});
