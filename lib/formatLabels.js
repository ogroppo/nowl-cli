const {isNotEmptyArray} = require('isnot')

module.exports = function formatLabels(labels){
	if(isNotEmptyArray(labels))
		return `[${labels.join('][')}]`

	return ''
}
