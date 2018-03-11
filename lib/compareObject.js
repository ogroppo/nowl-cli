const {isArray} = require('isnot');

module.exports = function compareObject(object, selector){
	return Object.keys(selector).every(selectorKey =>
	  Object.keys(object).some(objectKey => {
			if(isArray(selector[selectorKey]) && isArray(object[objectKey])){
				return selector[selectorKey].every(label => object[objectKey].includes(label))
			}
			else
	    	return selector[selectorKey] === object[objectKey]
	  })
	);
}
