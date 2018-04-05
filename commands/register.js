const chalk = require('chalk');
const md5 = require('md5');

const interface = require('../shell/interface')

const getEmail = require('../lib/getEmail')
const registerUser = require('../lib/registerUser')

exports.handler = async function registerCommand(argv) {

	var email = await getEmail(argv.email)
	if(email){
		console.log(chalk.red("User already exists"))
		process.exit();
	}

	let user = await registerUser(argv.email, argv.password, argv.username)

	console.log(chalk.green('Welcome'), user.name)
	process.exit();
}

exports.builder = {}
