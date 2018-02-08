module.exports = function compareRel(row, rel){
	let comparison = true;
	if(rel.name){
		if(row.name !== rel.name)
			return false
	}

	if(rel.start){
		if(row.start == rel.start)
			comparison = true
		else
			return false
	}

	if(rel.startLabel){
		if(row.startLabel === rel.startLabel)
			comparison = true
		else
			return false
	}

	if(rel.end){
		if(row.end == rel.end)
			comparison = true
		else
			return false
	}

	if(rel.endLabel){
		if(row.endLabel === rel.endLabel)
			comparison = true
		else
			return false
	}

	return comparison
}
