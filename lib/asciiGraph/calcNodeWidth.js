module.exports = function calcNodeWith(node, rel = {}, options = {}){
	let width = 0; //" =...= "

	if(node.name)
		width += node.name.length

	if(options.verbose)
		width += 3 //(1) id

	if(node.labels){
		node.labels.forEach(label=>{
			width += label.length + 2
		})
	}

	//rel

	return width;
}
