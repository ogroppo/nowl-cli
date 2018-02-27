const chalk = require('chalk');
const md5 = require('md5');

const system = require('../lib/json/system')
const interface = require('../shell/interface')

exports.handler = function connectCommand(argv) {

	var email = system().get({name: argv.email, domain: 'www'}).node()
	if(email)
		return console.log(chalk.red("Email already exists"))

	system().set({name: argv.email, labels: ["Email"], domain: 'www'}).run()
	system().set({hash: md5(argv.password), labels: ["PW Hash"], domain: argv.email}).run()

	let username = argv.username;
	if(!argv.username)
		username = argv.email.slice(0, argv.email.indexOf('@'))

	var user = system().set({name: username, labels: ["User"], domain: argv.email}).node()

	return console.log(chalk.green(`Welcome ${user.name}`))
}

exports.builder = {}
