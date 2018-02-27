import test from 'ava';

var addNode = require('../../lib/json/addNode')
var getNode = require('../../lib/json/getNode')
var resetAllNodes = require('../../lib/json/resetAllNodes')

test('system getNode', t => {
	resetAllNodes({test: true})
	let name = 'test node name';
	addNode({name: name}, {test: true})
	let node = getNode({name: name}, {test: true});
	t.is(node.name, name);
});
