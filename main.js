const express = require('express')
const app = express()
const cors = require('cors')

const qport = 8269;

app.use(cors())


app.get('/', (req,res) => {

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
