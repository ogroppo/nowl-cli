const chalk = require('chalk')
const md5 = require('md5')

exports.handler = function showDomainsCommand(argv) {
	const system = require('fluent-nowledge/system')
	var userPassword = system(argv.email).get(md5(argv.password), ["PW Hash"]).one()
	if(!userPassword)
		return console.log(chalk.red(`User does not exist`))

	var userDomains = system('domains').get().of(argv.email, {domain: 'www'}).all()
	if(!userDomains.length)
		return console.log(chalk.red(`Your have no domains`))

	console.log(chalk.green(`Your domains:`))
	userDomains.forEach(domain => {
		console.log(domain.name);
	})
}

exports.builder = {}
