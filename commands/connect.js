const chalk = require('chalk');

const authInterface = require('../interfaces/auth')
const login = require('../lib/login')
const getDomain = require('../lib/getDomain')

exports.handler = async function connect(argv) {

	var domain = await getDomain(argv.domain)
	if(!domain){
		console.log(chalk.red("Domain not found, set it up"))
		process.exit(1)
	}

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

	var permission = await getDomainPermission(domain, user)
	if(!permission){
		console.log(chalk.red("You don't have any permission on this Domain"))
		process.exit(1)
	}

	shell()
}

exports.builder = {}
