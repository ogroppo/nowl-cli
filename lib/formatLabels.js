const {isNotEmptyArray} = require('isnot')

const getLabelBgColor = require('./getLabelBgColor')

module.exports = function formatLabels(labels){
	let string = ''
	if(isNotEmptyArray(labels))
		string += `[${labels.join('][')}]`

	return string
}
