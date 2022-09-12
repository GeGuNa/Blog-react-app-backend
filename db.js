const knex = require('knex')


const db = knex({
client: 'pg', 
connection: {
user: 'qz',
password: '123456',
database: 'blog',
port: '5432'
}
})


module.exports = db
