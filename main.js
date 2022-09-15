const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db.js')
const page = require('./pages.js')
const { ifImage, Timestamp, IfImg } = require('./funcs.js')
const Fupload = require('express-fileupload')
const  Validator = require('Validator')

const qport = 8269;

app.use(cors())
app.use(express.json())
app.use(Fupload({
limits: { fileSize: 1024*1024*20 }
}));



app.use('/data', page);

app.get('/', async(req,res) => {

res.write(`test`)

res.end()
});


//@method == post
//adding images thru axios with react
app.post('/add_blog', async(req, res) => {


 if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(200).send('Choose image first');
  }



const qpname = req.body.title
const qpdesc = req.body.desc


const rules23 = {
    title: 'required|min:1|max:100',
    description: 'required|min:1|max:10000'
};


const data23 = {
	title: qpname,
	description: qpdesc
};


const Filen = req.files.foto;
const Filet = Filen.mimetype;



const vVldtofls = Validator.make(data23, rules23)
    
if (vVldtofls.passes() == true) {

const qztype = ifImage(Filet)


if (qztype) { 

const qid = await db('posts').returning('id').insert({
title: qpname, 
message: qpdesc, 
when_posted: Timestamp()
})

	Filen.mv(`${__dirname}/photos/${qid[0].id}.${qztype}`)
    res.send(`good`)
} else {
	return res.send(`only  images are allowed to`)
}


} else {
res.send(`some error been detected`)
}




res.end()
})


/*
app.get('/upl', (req,res)=>{

res.set('content-type','text/html')

res.write(`

<form action="/add_blog" method="post" enctype="multipart/form-data">

<label>Fileeee</lable>
<input type="file" name="foto"><br/>

<label>Title</lable>
<input type="text" name="title"><br/>

<label>Message</lable>
<input type="text" name="desc"><br/>



<input type="submit" value="go">
</form>


`)


res.end()
})
*/


app.listen(qport,(err) => {

if (err){
console.log(`some error occured`)
process.exit()
} else {
console.log(`yeah its working as it should at port ${qport} `)
}

})
