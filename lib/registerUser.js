const md5 = require('md5')

module.exports = async function registerUser(email, password, username) {
	const system = require('fluent-nowledge/system')

	await system('www').set(email, ["Email"]).run()

	await system(email).set(md5(password), ["PW Hash"]).run()

	if(!username)
		username = email.slice(0, email.indexOf('@'))

	var user = await system(email).set(username, ["User"]).return()
	return user
}
