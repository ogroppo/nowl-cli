const FluentNowldege = require('./index')

module.exports = function content(options = {}){
	Object.assign(options, {nodeType: 'content'})
	return new FluentNowldege(options)
}
