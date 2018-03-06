set('name').run()

get('name').one()
	{name: 'name'}

get('name').all()
	[
		{name: 'name'}
	]

get(['user']).all()
	[
		{labels: ['user']},
		{labels: ['user']}
	]

get('name').of('parentName').one()
	{name: 'name'}

get('name').of('parentName').pattern()
	[
		{name: 'name'},
		{name: 'parentName'}
	]

get('name').of('parentName').patterns()
	[
		[{name: 'name'}, {name: 'parentName'}]
	]

get('name').of(['parentLabel']).patterns()
	[
		[{name: 'name'}, {labels: ['parentLabel']}],
		[{name: 'name'}, {labels: ['parentLabel']}]
	]


get(['nodeLabel']).of(['parentLabel']).patterns()
[
	[{id: 1, labels: ['nodeLabel']}, {id: 3, labels: ['parentLabel']}],
	[{id: 1, labels: ['nodeLabel']}, {id: 4, labels: ['parentLabel']}]
	[{id: 2, labels: ['nodeLabel']}, {id: 3, labels: ['parentLabel']}]
	[{id: 2, labels: ['nodeLabel']}, {id: 4, labels: ['parentLabel']}]
]
