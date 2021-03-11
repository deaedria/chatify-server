// const route = require('express').Router
const userRoute = require('./User')
// const verifyToken = require('../helper/verifyToken')
const contactRoute = require('./Contact')
const contactListRoute = require('./ContactListEachUser')
const uploadRoute = require('./Upload')

const app = (route, prefix) => {
    route.use(`${prefix}/users`, userRoute)
    route.use(`${prefix}/contacts`, contactRoute)
    route.use(`${prefix}/contactlist`, contactListRoute)
    route.use(`${prefix}/upload`, uploadRoute)
}

module.exports = app