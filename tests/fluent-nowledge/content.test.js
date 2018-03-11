import test from 'ava';

var getDb = require('../../lib/mongo/getDb');
var deleteNodes = require('../../lib/mongo/deleteNodes');
var deleteRels = require('../../lib/mongo/deleteRels');
var Content = require('../../lib/fluent-nowledge/Content')

let content;
test.beforeEach(async () => {
	let db = await getDb({test: true})
	await deleteNodes(db)
	await deleteRels(db)
	content = Content({db: db, domain: 'testdomain'})
});

test('fluent-nowledge content', t => {
	t.is(content().constructor.name, 'FluentNowledge');
});

test('fluent-nowledge content set and return node', async t => {
	let nodeName = 'nodignolo'
	let setted = await content().set(nodeName).return()
	let node = await content().get(nodeName).return()
	t.is(setted.name, nodeName);
	t.is(node.name, nodeName);
});

test('fluent-nowledge content set of and return node', async t => {
	let nodeName = 'nodignolo';
	let parentName = 'nodignolone';
	let setted = await content().set(nodeName).of(parentName, ['cane']).return()
	await content().set(parentName, ['infame']).return()
	t.is(setted.name, nodeName);
	let node = await content().get(nodeName).of(parentName, ['infame']).return()
	t.is(node.name, nodeName);
});
