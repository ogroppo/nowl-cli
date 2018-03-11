const FluentNowldege = require('./index')

module.exports = function Content(options = {}){
	let config = Object.assign(options, {nodeType: 'content'})
	return () => new FluentNowldege(config)
}
