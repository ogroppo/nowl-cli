const inquirer = require('inquirer');
const login = require('../lib/login');

module.exports = function authInterface(argv){
	return inquirer.prompt([
		{
			prefix: '',
			name: 'email',
			message: 'email: '
		},
		{
			prefix: '',
			type: 'password',
			name: 'password',
			message: 'password: '
		}
	]).then(answers => {
		return {email: answers.email, password: answers.password}
	});
}
