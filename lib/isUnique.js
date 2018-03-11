module.exports = function isUnique(object){
	return object.id || object.uuid || object.name || (object.start && object.end);
}
