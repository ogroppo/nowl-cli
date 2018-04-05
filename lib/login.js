const md5 = require('md5')

module.exports = function login(email, password) {
	const system = require('fluent-nowledge/system')

	return system(email)
		.get(md5(password), ["PW Hash"])
		.get(["User"])
		.returnNode()
		//.debug()
		.fetchNode()

}
