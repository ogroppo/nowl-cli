module.exports = function mergeObject(object, selector){
	for (var key in selector) {
		if(key === 'labels'){
			object.labels = object.labels.concat(selector.labels.filter(label=>!object.labels.includes(label)))
			object.labels.sort()
		}else{
			object[key] = selector[key]
		}
	}

	return object
}
