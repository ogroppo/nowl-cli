const FluentNowledge = require('./index')
const {isString} = require('isnot')

module.exports = function system(options = {}){
	if(isString(options))
		options = {domain: options}

	Object.assign(options, {nodeType: 'system', driver: 'json'})
	return new FluentNowledge(options)
}
