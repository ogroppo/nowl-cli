const moment = require('moment')

module.exports = function formatDate(date){
	if(date)
		return moment(date).format("D MMM YYYY HH:mm")

	return ''
}
