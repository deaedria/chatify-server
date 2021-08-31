const connectionString = "postgres://cqmiqtkjuzklyf:06c5fa9520d753b05a58c2831b157f0281316c2b22d9d354b9532adf9094c9e1@ec2-3-230-61-252.compute-1.amazonaws.com:5432/dc79bcjctssn3s"
const { Pool } = require('pg');
//connection
const {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME} = process.env

const db = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

// const db = new Pool({
//   host: DB_HOST,
//   port: DB_PORT,
//   user: DB_USER,
//   password: DB_PASSWORD,
//   database: DB_NAME
// })

db.connect().then(() => {
    console.log('database connected successfully');
}).catch((err) => {
    console.log('error, db cannot connected', err);
})

module.exports = db

