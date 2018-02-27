const FluentNowledge = require('../../fixtures/fluent-nowledge')

module.exports = function system(options = {}){
	return new FluentNowledge({
		domain: options.domain,
		type: 'system',
		driver: 'json'
	})
}
