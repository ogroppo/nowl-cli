const chalk = require('chalk');
const md5 = require('md5');

const system = require('../lib/json/system')

exports.handler = function userCommand(argv) {

	var userPassword = system().get({hash: md5(argv.password), labels: ["PW Hash"], domain: argv.email}).node()
	if(!userPassword)
		return console.log(chalk.red(`User does not exist`))

	var user = system().get({labels: ["User"], domain: argv.email}).node()

	return console.log(chalk.green("User:"), user.name)
}

exports.builder = {}
