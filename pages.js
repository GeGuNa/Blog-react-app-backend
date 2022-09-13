const express = require('express')
const page = express.Router()
const db = require('./db.js')



page.get('/', async(req, res) => {

//const qd = await db('category');
const qd = await db('category').where('id','>', 0);


res.json(qd)

res.end()
});



page.get('/list', async(req, res) => {

//const qd = await db('posts');
const qd = await db('posts').where('id','>', 0).orderBy('id','desc');

res.json(qd)

res.end()
});



page.get('/random_posts', async(req, res) => {

//const qd = await db('posts').orderByRaw('RANDOM()').limit(1);

const qd = await db('posts').orderByRaw('RANDOM()').limit(6);


res.json(qd)

res.end()
});


page.get('/viewed', async(req, res) => {

const qd = await db('posts').select('*').where('views','>','0').orderBy('views','desc').limit(6);

res.json(qd)

res.end()

});




module.exports = page;
