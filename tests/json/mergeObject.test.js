import test from 'ava';

var mergeObject = require('../../lib/json/mergeObject')

test('json mergeObject', t => {
	t.deepEqual(mergeObject({name: 'name'}, {name: 'name1'}), {name: 'name1'});
	t.deepEqual(mergeObject({date: '1990'}, {name: 'name1'}), {name: 'name1', date: '1990'});
	t.deepEqual(mergeObject({labels: []}, {labels: []}), {labels: []});
	t.deepEqual(mergeObject({labels: ['one']}, {labels: ['two']}), {labels: ['one', 'two']});
	t.deepEqual(mergeObject({labels: ['one', 'two']}, {name: 'paul', labels: ['three']}), {name: 'paul', labels: ['one', 'three', 'two']});
});
