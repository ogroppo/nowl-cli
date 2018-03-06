const fs = require('fs')
const path = require('path')

const settings = require('../../settings')

const calcNewId = require('./calcNewId')
const getAllRels = require('./getAllRels')

module.exports = function addRel(selector, options = {}){

	let allRels = getAllRels(options)

	selector.id = calcNewId(allRels)
	selector.createdAt = new Date().toISOString()

	allRels.push(selector)

	try {
		let path = options.test ? settings.relsTestPath : settings.relsPath
		let content = JSON.stringify(allRels, null, 2)
		fs.writeFileSync(path, content)
	} catch (e) {
		throw e
	}

	return selector
}
