exports.handler = function createCommand(argv) {

	var domains = require('../domains')

	if(domains[argv.domain])
		console.error("Domain exists already");
	else {
		createDomain(argv.domain)
	}
}

exports.builder = {}

function createDomain(domainName){
	var domains = require('../domains')
}
