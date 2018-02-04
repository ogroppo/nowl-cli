const csv = require('fast-csv')
const path = require('path')
const getLabels = require('./getLabels')
const calcId = require('./calcId')

let domain = "../db/og-domain/"
let labelsFile = path.join(__dirname, domain, 'labels.csv')
let labelModel = require('../db/labelModel')

module.exports = function addLabel(labelToAdd){
	return new Promise((resolve, reject)=>{
		getLabels().then(({labelsCollection})=>{
			let setHeaders = labelsCollection.length ? false : labelModel

			let labelObj = {name: labelToAdd}
			labelObj.id = calcId(labelsCollection)
			labelObj.createdAt = new Date().toISOString()
			labelsCollection.push(labelObj)

			csv
			.writeToPath(labelsFile, labelsCollection, { headers: setHeaders })
			.on("finish", function(){
				resolve(labelObj)
			})
		}).catch(e=>console.info(e))
	})
}
