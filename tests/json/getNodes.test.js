import test from 'ava';

var addNode = require('../../lib/json/addNode')
var getNodes = require('../../lib/json/getNodes')
var resetAllNodes = require('../../lib/json/resetAllNodes')

test('json getNodes', t => {
	resetAllNodes({test: true})
	let selector = {labels: ['test label']}
	addNode(selector, {test: true})
	addNode(selector, {test: true})
	addNode(selector, {test: true})

	let nodes = getNodes(selector, {test: true});
	t.is(nodes.length, 3);
	t.is(nodes[0].labels[0], 'test label');
});
