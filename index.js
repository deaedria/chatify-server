const express= require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = process.env.PORT;
const host = process.env.DB_HOST;
const prefix = process.env.PREFIX_URI;

//routing imports
const router = require('./route');
router(app, `${prefix}`);

//testing
app.get(`${prefix}`, (req, res) => {
    res.send("Hello World");
})

app.get('*', (req, res) => {
    res.status(404).send({
        message: 'Resource Not Found',
        statusCode: 404
    })
})

//end routing
app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}${prefix}`)
})