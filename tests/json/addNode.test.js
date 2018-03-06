import test from 'ava';

var addNode = require('../../lib/json/addNode')
var resetAllNodes = require('../../lib/json/resetAllNodes')

test('json addNode', t => {
	resetAllNodes({test: true})
	let name = 'new test node name';
	let node = addNode({name: name}, {test: true});
	t.is(node.name, name);
	t.is(node.id, 1);
	t.truthy(node.createdAt);
	let name2 = 'new test node other name';
	let node2 = addNode({name: name2}, {test: true});
	t.is(node2.name, name2);
	t.is(node2.id, 2);
});
