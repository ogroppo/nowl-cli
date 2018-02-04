const csv = require('fast-csv')
const path = require('path')
const getRel = require('./getRel')
const getRels = require('./getRels')
const calcId = require('./calcId')

let domain = "../db/og-domain/"
let relsFile = path.join(__dirname, domain, 'rels.csv')
let relModel = require('../db/relModel')

module.exports = function setRel(relToSet){
	return new Promise((resolve, reject)=>{
		getRel(relToSet).then(async (gettedRel)=>{
			if(gettedRel){
				resolve(gettedRel)
			} else {
				let addedRel = await addRel(relToSet)
				resolve(addedRel)
			}
		})
	})
}

function addRel(relToAdd){
	return new Promise((resolve, reject)=>{
		getRels().then(async relsCollection => {
			let setHeaders = relsCollection.length ? false : relModel

			relToAdd.id = calcId(relsCollection)
			relToAdd.createdAt = new Date().toISOString()
			relsCollection.push(relToAdd)

			csv
			.writeToPath(relsFile, relsCollection, { headers: setHeaders })
			.on("finish", function(){
				resolve(relToAdd)
			})
		}).catch(e=>console.info(e))
	})
}
