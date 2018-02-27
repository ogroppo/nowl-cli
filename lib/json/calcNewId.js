module.exports = function calcNewId(collection){
	if(collection.length){
		return collection[collection.length - 1].id + 1
	}

	return 1
}
