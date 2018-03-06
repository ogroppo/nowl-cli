import test from 'ava';

var content = require('../../lib/fluent-nowledge/content')

test('fluent-nowledge content', t => {
	t.is(content().constructor.name, 'FluentNowledge');
});

test('fluent-nowledge content get and return node', t => {
	let nodeName = 'nodignolo'
	let setted = content({test: true, driver: 'json', domain: 'test'}).set(nodeName).return()
	let node = content({test: true, driver: 'json', domain: 'test'}).get(nodeName).return()
	t.is(setted.name, nodeName);
	t.is(node.name, nodeName);
});
