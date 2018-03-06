const fs = require('fs')
const path = require('path')

const settings = require('../../settings')

const resetAllRels = require('./resetAllRels')

module.exports = function resetAllRels(options = {}){
	try {
		let path = options.test ? settings.relsTestPath : settings.relsPath
		fs.writeFileSync(path, JSON.stringify([], null, 2))
	} catch (e) {
		throw e
	}
}
