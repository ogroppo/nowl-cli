#!/usr/bin/env node
const argv = require('yargs')
	.usage('Usage: $0 <command> [options]')
	.command('user <email> <password>', "Show user", require('./commands/user'))
	.command('register <email> <password> [username]', "Register a user", require('./commands/register'))
	.command('connect <domain> <email> <password>', "Connect to domain", require('./commands/connect'))
	.command('create <domain> <email> <password>', "Create a domain", require('./commands/create'))
	.command('show-domains <email> <password>', "Show domains", require('./commands/showDomains'))
	.count('verbose')
	.alias('v', 'verbose')
	.demandCommand(1)
  .argv
