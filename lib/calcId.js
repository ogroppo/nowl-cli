module.exports = (collection) => {
	if(collection.length){
		let last = collection.slice(-1)[0]
		let lastId = parseInt(last.id)
		if(!isNaN(lastId))
			return lastId + 1
	}

	return 1
}
