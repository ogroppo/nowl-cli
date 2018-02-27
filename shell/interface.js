const readline = require('readline');
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
			console.log(command);
			if(shellCommands[command]){
				shellCommands[command].action()
			}else{
				try {
					eval(line)
				} catch (e) {
					console.dir(e);
				}
				rl.prompt();
			}
	}).on('close',function(){
			process.exit(0);
	});
}
