#!/usr/bin/env node
console.log();

const argv = require('yargs')
	.usage('Usage: $0 <command> [options]')
	.command('get    <node> [rel] [child]', 'Get a node or pattern', require('./commands/get'))
	.command('set    <node> [rel] [child]', 'Set a node or pattern', require('./commands/set'))
	.command('change <old node> <new node>', "Change node's name", require('./commands/change'))
	.command('delete <node>', "Delete a node", require('./commands/delete'))
	.command('graph <node>', "Show a node's graph", require('./commands/graph'))
	.count('verbose')
	.alias('v', 'verbose')
	.demandCommand(1)
  .argv
