module.exports = function formatLabels(labels){
	let string = ''
	if(labels && labels.length){
		string += `[${labels.join('][')}]`
	}

	return string
}
