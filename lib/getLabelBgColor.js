const chalk = require('chalk')

let bgColors = [
	chalk.red,
	chalk.bgGreen,
	chalk.bgYellow,
	chalk.bgBlue,
	chalk.bgMagenta,
	chalk.bgCyan
]

module.exports = function getLabelBgColor(label){

	let colorIndex = parseInt(label, 36) % bgColors.length

	return bgColors[colorIndex](label)
}
