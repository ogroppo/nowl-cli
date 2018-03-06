import test from 'ava';

var setNode = require('../../lib/json/setNode')
var getNode = require('../../lib/json/getNode')
var resetAllNodes = require('../../lib/json/resetAllNodes')

test('system setNode', t => {
	resetAllNodes({test: true})
	let name = 'test setNode';
	let settedNode = setNode({name: name}, {test: true})
	let node = getNode({name: name}, {test: true});
	t.is(settedNode.id, node.id);
	t.is(node.name, name);
	let resettedNode = setNode({name: name}, {test: true})
	t.is(resettedNode.id, node.id);
});
