const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db.js')
const page = require('./pages.js')
const { ifImage, Timestamp, IfImg, Is_number } = require('./funcs.js')
const Fupload = require('express-fileupload')
const  Validator = require('Validator')

const qport = 8269;

app.use(cors())
app.use(express.json())
app.use(Fupload({
limits: { fileSize: 1024*1024*20 }
}));



app.use('/photo', express.static(`${__dirname}/photos`))

app.use('/data', page);




app.get('/', async(req,res) => {

res.write(`test`)

res.end()
});




app.get('/post/:id', async(req,res) => {

var cid = Math.round(parseInt(req.params.id));

if (Is_number(cid)) {

const cntifxsts = await db('posts').where({id: cid}).first();

if (!cntifxsts) {
	
	return res.status(200).send({status:'error_post'})
	
} else {
	
	
const cqid = await db('posts').where({id: cid});
	

return res.status(200).send(cqid)		

}
	
} else {
	
res.status(200).send(`it must be number `)	
}



res.end()
});



app.get('/cat/:id', async(req,res) => {

var cid = Math.round(parseInt(req.params.id));

if (Is_number(cid)) {

const cntifxsts = await db('category').where({id: cid}).first();

if (!cntifxsts) {
	
	return res.status(200).send(` category doesn't exists`)
	
} else {
	
	
const cqid = await db('posts').where({cat: cid});
	

return res.status(200).send(cqid)		

}
	
} else {
	
res.status(200).send(`it must be number `)	
}



res.end()
});


app.get('/cat', async(req, res) => {

const qd = await db('category').where('id','>', 0);

res.json(qd)

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
const qpcatid = Math.round(parseInt(req.body.catid))


if (!Is_number(qpcatid)) {
	return res.status(200).send(`uups ;)`)
}


const cntifxsts = await db('category').where({id: qpcatid}).first();

if (!cntifxsts) {
	return res.status(200).send(` category doesn't exists`)
}



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

const qda222 = new Date().getTime()

const qz221  = Math.floor(Math.random()*10000)+1

const QzFlNm = `${qz221}_${qda222}_${Filen.name}`


if (qztype) { 

const qid = await db('posts').returning('id').insert({
title: qpname, 
message: qpdesc, 
when_posted: Timestamp(),
cat: qpcatid,
fileaddr: QzFlNm
})

	Filen.mv(`${__dirname}/photos/${QzFlNm}`)
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
