const system = require('fluent-nowledge/system')

module.exports = function getDomain(domain) {

	return system('domains')
		.get(domain)
		.returnNode()
		.debug()
		.fetchNode()

}
