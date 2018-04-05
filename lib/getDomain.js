
module.exports = function getDomain(domain, user) {
	const system = require('fluent-nowledge/system')

	return system('domains')
		.get(domain)
		.of(user)
		.returnNode()
		.debug()
		.fetchNode()

}
