const { Client } = require('pg');
//connection
const {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME} = process.env

const db = new Client({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
})

db.connect().then(() => {
    console.log('database berhasil terhubung');
}).catch((err) => {
    console.log('error, db tidak tersambung', err);
})

module.exports = db

