const chalk = require('chalk')

module.exports = function formatRel(rel = {}, options = {}){
	let string = ' -'
	if(rel.id && options.verbose){
		if(rel.isNew)
			string += chalk.green(`(${rel.id})`)
		else
			string += chalk.grey(`(${rel.id})`)
	}
	if(rel.name)
		string += rel.name

	//if(string.length === 2)
	//	string += '-'

	string += '-> '

	return string
}
