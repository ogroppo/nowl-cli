
module.exports = async function getEmail(email) {
	const system = require('fluent-nowledge/system')

	var emailNode = await system('www').get(email).return()
	return emailNode
}
