import test from 'ava';

var setNode = require('../../lib/json/setNode')
var setParent = require('../../lib/json/setParent')
var resetAllNodes = require('../../lib/json/resetAllNodes')
var resetAllRels = require('../../lib/json/resetAllRels')

test('json setParent', t => {
	resetAllNodes({test: true})
	resetAllRels({test: true})
	let name = 'test node';
	let parentName = 'test parent';
	let node = setNode({name: name}, {test: true})
	let parent = setParent({name: parentName}, node, {test: true});
	t.is(parent.name, parentName);
	t.is(parent.rel.end, node.id);
});
