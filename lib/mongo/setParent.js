const setNode = require('./setNode');
const setRel = require('./setRel');

module.exports = async function setParent(db, selector, node){
	let parent = await setNode(db, selector);
	let relSelector = {start: parent._id, end: node._id};
	parent.rel = await setRel(db, relSelector);
	return parent;
}
