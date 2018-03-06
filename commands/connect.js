const md5 = require('md5');
const chalk = require('chalk');

const system = require('../lib/fluent-nowledge/system')
const interface = require('../shell/interface')

exports.handler = function connectCommand(argv) {

	var userPassword = system(argv.email).get(md5(argv.password), ["PW Hash"]).one()
	if(!userPassword)
		return console.log(chalk.red(`User does not exist`))

	var domain = system('domains').get(argv.domain).one()
	if(!domain)
		return console.log(chalk.red("Domain not found, set it up"))

	var user = system(argv.email).get(["User"]).one()

	var userDomain = system('domains').get(argv.domain).of(argv.email, {domain: 'www'}).one()
	if(!userDomain)
		return console.log(chalk.red("You cannot access this domain"))

	interface(user, domain)
}

exports.builder = {}
