import test from 'ava';

var setNode = require('../../lib/json/setNode')
var setParent = require('../../lib/json/setParent')
var getParents = require('../../lib/json/getParents')
var resetAllNodes = require('../../lib/json/resetAllNodes')
var resetAllRels = require('../../lib/json/resetAllRels')

test('json getParents', t => {
	resetAllNodes({test: true})
	resetAllRels({test: true})

	let node = setNode({name: 'nodeNameTest'}, {test: true})
	setParent({labels: ['one']}, node, {test: true})
	setParent({labels: ['two']}, node, {test: true})
	setParent({labels: ['three']}, node, {test: true})

	let parents = getParents({}, node, {test: true});
	t.is(parents.length, 3);
	t.is(parents[0].labels[0], 'one');
});
