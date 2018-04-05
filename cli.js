#!/usr/bin/env node
// process.env.NEO4J_URL = 'bolt://hobby-necdejfcclhegbkeceejghal.dbs.graphenedb.com:24786'
// process.env.NEO4J_USER = 'test-user'
// process.env.NEO4J_PASS = 'b.EDrFqsTGJOVs.Ffxm9FW9iGE0rF6j'

process.env.NEO4J_URL = 'bolt://localhost'
process.env.NEO4J_USER = 'neo4j'
process.env.NEO4J_PASS = 'neo1313'

const argv = require('yargs')
	.usage('Usage: $0 <command> [options]')
	.command('user <email> <password>', "Show user", require('./commands/user'))
	.command('register <email> <password> [username]', "Register a user", require('./commands/register'))
	.command('connect [options]', "Connect to domain", require('./commands/connect'))
	.command('create <domain> <email> <password>', "Create a domain", require('./commands/create'))
	.command('show-domains <email> <password>', "Show domains", require('./commands/showDomains'))
	.count('verbose')
	.alias('v', 'verbose')
	.demandCommand(1)
  .argv
