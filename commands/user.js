const chalk = require('chalk');
const md5 = require('md5');
const moment = require('moment');

const system = require('../lib/fluent-nowledge/system')

exports.handler = function userCommand(argv) {

	var userPassword = system(argv.email).get(md5(argv.password), ["PW Hash"]).one()
	if(!userPassword)
		return console.log(chalk.red(`User does not exist`))

	var userEmail = system('www').get(argv.email, ["Email"]).one()
	if(!userEmail)
		return console.log(chalk.red(`User Email does not exist`))

	var user = system(argv.email).get(["User"]).one()

	return console.log(chalk.green("User:"), user.name, userEmail.name, moment(user.createdAt).format('DD MMMM YYYY'))
}

exports.builder = {}
