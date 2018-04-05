const md5 = require('md5');
const chalk = require('chalk');

const authInterface = require('../interfaces/authInterface')
const login = require('../lib/login')
const getDomain = require('../lib/getDomain')

exports.handler = async function connect(argv) {

	var email, password;
	if(!argv.email || !argv.password){
		var {email, password} = await authInterface(argv)
	}
	else {
		email = argv.email.trim()
		password = argv.password.trim()
	}

	let user = await login(email, password)
	if(!user){
		console.log(chalk.red(`User does not exist`))
		process.exit(1)
	}
	//
	// var domain = await getDomain(argv.domain, user)
	// if(!domain)
	// 	return console.log(chalk.red("Domain not found, set it up"))
	//
	// domainInterface(user, domain)
}

exports.builder = {}
