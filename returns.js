get('name').return()
	{name: 'name'}

get(['user']).return()
	[
		{id: 1, labels: ['user']},
		{id: 2, labels: ['user']}
	]

get(['user']).first()
{id: 1, labels: ['user']}

get(['user']).return().string()
`(1)[user]`
`(2)[user]`

get('name').of('parentName').return()
	{name: 'name'}

get('name').of('parentName').having('cousinName').pattern()
[
	{name: 'name'},
	{name: 'parentName', rel: {id: 1}}
	{name: 'cousinName', rel: {id: 2}}
]
'(1)name <=(1)= (2)parentName =(2)=> (3)cousinName' //in cli

get('name').descending('granPName').path()
[
	{id: 2, startNode: {name: 'parentName'}, endNode: {name: 'name'}}
	{id: 1, startNode: {name: 'granPName'}, endNode: {name: 'parentName'}}
]

get('granPName').ascending('name').path()
[
	{id: 1, startNode: {name: 'granPName'}, endNode: {name: 'parentName'}}
	{id: 2, startNode: {name: 'parentName'}, endNode: {name: 'name'}}
]


get('name').of('parentName').having('cousinName').tree()
{ name: 'name', parents: [ {id: 2, name: 'parentName', rel: {id: 1}} ]}
'(2)parentName -(1)-> *(1)name'

get('name').of(['parentLabel']).having('cousinName').pattern()
[
	[{id: 1, name: 'name'}, {id: 2, labels: ['parentLabel'], rel: {id: 1, endLabel: 'parentLabel'} }],
	[{id: 1, name: 'name', labels: ['Dev']}, {id: 3, labels: ['parentLabel'], rel: {id: 1, startLabel: 'Dev', endLabel: 'parentLabel'} }]
]


get(['nodeLabel']).of(['parentLabel']).pattern()
[
	[{id: 1, labels: ['nodeLabel']}, {id: 3, labels: ['parentLabel']}],
	[{id: 1, labels: ['nodeLabel']}, {id: 4, labels: ['parentLabel']}]
	[{id: 2, labels: ['nodeLabel']}, {id: 3, labels: ['parentLabel']}]
	[{id: 2, labels: ['nodeLabel']}, {id: 4, labels: ['parentLabel']}]
]
