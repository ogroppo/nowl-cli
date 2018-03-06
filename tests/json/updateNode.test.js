import test from 'ava';

var updateNode = require('../../lib/json/updateNode')
var setNode = require('../../lib/json/setNode')
var resetAllNodes = require('../../lib/json/resetAllNodes')

test('json updateNode', t => {
	resetAllNodes({test: true})
	let name = 'test updateNode';
	let settedNode = setNode({name: name, labels: ['a label']}, {test: true})
	let updatedNode = updateNode({name: name, labels: ['and anotherLabel']}, {test: true});
	t.is(settedNode.id, updatedNode.id);
	t.deepEqual(updatedNode.labels, ['a label', 'and anotherLabel']);
	t.truthy(updatedNode.updatedAt);
});
