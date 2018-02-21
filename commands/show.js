exports.handler = function showCommand(argv) {

	var domains = require('../domains')

	console.dir(domains);
}

exports.builder = {}
