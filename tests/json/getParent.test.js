import test from 'ava';

var getNode = require('../../lib/json/getNode')
var setNode = require('../../lib/json/setNode')
var getParent = require('../../lib/json/getParent')
var setParent = require('../../lib/json/setParent')
var resetAllNodes = require('../../lib/json/resetAllNodes')
var resetAllRels = require('../../lib/json/resetAllRels')

test('json getParent', t => {
	resetAllNodes({test: true})
	resetAllRels({test: true})
	let name = 'test node';
	let parentName = 'test parent';

	setParent({name: parentName}, setNode({name: name}, {test: true}), {test: true});

	let node = getNode({name: name}, {test: true})
	let parent = getParent({name: parentName}, node, {test: true});
	t.is(parent.name, parentName);
	t.is(parent.id, 2);
	t.is(parent.rel.end, node.id);
});
