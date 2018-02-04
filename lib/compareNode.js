const parseCsvNode = require('./parseCsvNode')
const {isString} = require('isnot')

module.exports = (row, node) => {
	if(node.id){
		if(row.id == node.id)
			return row
		else
			return undefined
	}

	if(node.name){
		if(row.name === node.name){
			if(node.labels && node.labels.length){
				if(compareLabels(row, node))
					return row
				else
					return undefined
			}else{
				return row
			}
		}else {
			return undefined
		}
	}else if(node.labels && node.labels.length){
		if(compareLabels(row, node))
			return row
		else {
			return undefined
		}
	}

	return row
}

function compareLabels(row, node){
	let rowLabels = row.labels
	if(isString(row.labels))
		rowLabels = row.labels.split(',')

	let foundLabels = node.labels.filter(label => rowLabels.includes(label))
	if(foundLabels.length === node.labels.length)
		return true
}
