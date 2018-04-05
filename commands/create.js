const chalk = require('chalk')
const md5 = require('md5')

exports.handler = function createCommand(argv) {
	const system = require('fluent-nowledge/system')

	var domain = system('domains').get(argv.domain).one()
	if(domain)
		return console.error(chalk.red("Domain exists already"), domain.name);
	else {
		var userPassword = system(argv.email).get(md5(argv.password), ["PW Hash"]).one()
		if(!userPassword)
			return console.log(chalk.red(`User does not exist`))

		domain = system('domains').set(argv.domain, ['Domain'], {driver: 'json'}).of(argv.email, {domain: 'www'}).one()
		return console.log(chalk.green("Domain created"), domain.name);
	}
}

exports.builder = {}
