const readline = require('readline');
const content = require('../lib/fluent-nowledge/content');
const shellCommands = {
	"quit": { action: ()=>process.exit(0) },
	"exit": { action: ()=>process.exit(0) },
	"close": { action: ()=>process.exit(0) },
	"switch": {}
}

module.exports = function interface(user, domain){
	var stdin = process.openStdin();

	stdin.addListener("data", function(char) {

	});
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.setPrompt(`${user.name}@${domain.name}> `);
	rl.prompt();
	rl.on('line', function(line) {
			//console.log(line);
			let command = line.split(" ").shift()
			//console.log(command);
			if(shellCommands[command]){
				shellCommands[command].action()
			}else{
				evalLine(line, content({domain: domain.name}))
				rl.prompt();
			}
	}).on('close',function(){
			process.exit(0);
	});
}

function evalLine(line, content){
	try {
		console.log(eval(line));
	} catch (e) {
		console.dir(e);
	}
}
