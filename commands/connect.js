const readline = require('readline');
const md5 = require('md5');
const {isArray} = require('isnot');

exports.handler = function connectCommand(argv) {

	var systemNodes = require('../system/nodes.json')

	var systemDomain = getSystemNode({name: argv.domain, domain: 'domains'})
	if(!systemDomain)
		throw "Domain not found, set it up"

	var systemPassword = getSystemNode({hash: md5(argv.password), domain: argv.email})
	if(!systemPassword)
		throw "Could not authenticate"

	var systemUser = getSystemNode({labels: ["User"], domain: argv.email})

	var permissions = getSystemRel({start: systemUser.id, end: systemDomain.id, domain: argv.email})
	if(!permissions)
		throw "You cannot access this domain"

	domainInterface(systemUser, systemDomain)
}

function getSystemNode(filter){
	var systemNodes = require('../system/nodes.json').nodes

	var systemNode
	systemNodes.forEach(node => {
		var found = compareObject(node, filter)
		if(found){
			systemNode = node
		}
	})
	return systemNode
}

function getSystemRel(filter){
	var systemRels = require('../system/rels.json').rels

	var systemRel
	systemRels.forEach(rel => {
		var found = compareObject(rel, filter)
		if(found){
			systemRel = rel
		}
	})
	return systemRel
}

function compareObject(object, selector){
	return Object.keys(selector).every(selectorKey =>
	  Object.keys(object).some(objectKey => {
			if(isArray(selector[selectorKey]) && isArray(object[objectKey])){
				return selector[selectorKey].every(label => object[objectKey].includes(label))
			}
			else
	    	return selector[selectorKey] === object[objectKey]
	  })
	);
}

function domainInterface(user, domain){
	var stdin = process.openStdin();

	stdin.addListener("data", function(char) {

	});
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.setPrompt(`${user.name}@${domain.name}> `);
	rl.prompt();
	rl.on('line', function(line) {
			//console.log(line);
			try {
				eval(line)
			} catch (e) {
				console.dir(e);
			}
			rl.prompt();
	}).on('close',function(){
			process.exit(0);
	});
}

exports.builder = {}
