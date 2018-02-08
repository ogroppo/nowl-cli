module.exports = function pluralize(name, count, suffix = 's'){
	if(count != 1)
		return name + suffix;

	return name;
}
