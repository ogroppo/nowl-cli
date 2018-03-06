const chalk = require('chalk');
const md5 = require('md5');

const system = require('../lib/fluent-nowledge/system')
const interface = require('../shell/interface')

exports.handler = function connectCommand(argv) {

	var email = system('www').get(argv.email).one()
	if(email)
		return console.log(chalk.red("Email already exists"))

	system('www').set(argv.email, ["Email"]).run()
	system(argv.email).set(md5(argv.password), ["PW Hash"]).run()

	let username = argv.username;
	if(!argv.username)
		username = argv.email.slice(0, argv.email.indexOf('@'))

	var user = system(argv.email).set(username, ["User"]).one()

	return console.log(chalk.green('Welcome'), user.name)
}

exports.builder = {}
