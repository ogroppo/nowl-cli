import test from 'ava';

var compareObject = require('../../lib/json/compareObject')

test('json compareObject', t => {
	t.is(compareObject({name: 'name'}, {name: 'name'}), true);
	t.is(compareObject({name: 'name', labels: []}, {name: 'name', labels: []}), true);
	t.is(compareObject({name: 'name', labels: ['label1']}, {name: 'name', labels: []}), true);
	t.is(compareObject({name: 'name', labels: ['label1']}, {name: 'name', labels: ['label1']}), true);
	t.is(compareObject({name: 'name', labels: ['label1', 'label2']}, {name: 'name', labels: ['label1']}), true);
	t.is(compareObject({labels: ['label1', 'label2']}, {labels: ['label1', 'label2']}), true);

	t.is(compareObject({value: 1}, {name: 'name'}), false);
	t.is(compareObject({value: 1}, {value: '2'}), false);
	t.is(compareObject({value: 1}, {value: 2}), false);
	t.is(compareObject({labels: []}, {labels: ['label']}), false);
	t.is(compareObject({labels: ['other']}, {labels: ['label']}), false);
	t.is(compareObject({labels: ['other']}, {labels: ['label', 'other']}), false);
});
