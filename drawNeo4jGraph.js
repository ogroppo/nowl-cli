const asciiGraph = require('./lib/asciiGraph')
const queryGraphToLevelGraph = require('./lib/asciiGraph/queryGraphToLevelGraph');

var jsonGraph = require('./fixtures/neo4jQueryGraph');
var levelGraph = queryGraphToLevelGraph(jsonGraph);
//console.log(levelGraph);
asciiGraph(levelGraph);
