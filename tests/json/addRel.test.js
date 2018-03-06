import test from 'ava';

var addRel = require('../../lib/json/addRel')
var resetAllRels = require('../../lib/json/resetAllRels')

test('json addRels', t => {
	resetAllRels({test: true})
	let rel = addRel({type: 'has', start: 1, end: 2}, {test: true});
	t.is(rel.type, 'has');
	t.is(rel.id, 1);
	t.truthy(rel.createdAt);
	let rel2 = addRel({type: 'has', start: 1, end: 2, endLabel: 'ciccio'}, {test: true});
	t.is(rel2.endLabel, 'ciccio');
	t.is(rel2.id, 2);
});
