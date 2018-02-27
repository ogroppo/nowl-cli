const md5 = require('md5');
const chalk = require('chalk');

const getNode = require('../lib/json/getNode')
const getRel = require('../lib/json/getRel')
const interface = require('../shell/interface')

exports.handler = function connectCommand(argv) {

	var domain = getNode({name: argv.domain, domain: 'domains', type: 'system'})
	if(!domain)
		return console.log(chalk.red("Domain not found, set it up"))

	var userPassword = getNode({hash: md5(argv.password), domain: argv.email, type: 'system'})
	if(!userPassword)
		return console.log(chalk.red("Could not authenticate"))

	var user = getNode({labels: ["User"], domain: argv.email, type: 'system'})

	var permissions = getRel({start: user.id, end: domain.id, domain: argv.email})
	if(!permissions)
		return console.log(chalk.red("You cannot access this domain"))

	interface(user, domain)
}

exports.builder = {}
