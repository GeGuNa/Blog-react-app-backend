const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db.js')


const qport = 8269;

app.use(cors())


app.get('/', async(req,res) => {


//const qcat = await db('category').where("id",">",0);
//console.log(qcat)

res.write(`test`)

res.end()
});


app.listen(qport,(err) => {

if (err){
console.log(`some error occured`)
process.exit()
} else {
console.log(`yeah its working as it should at port ${qport} `)
}

})
