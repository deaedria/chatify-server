// const route = require('express').Router
const userRoute = require('./User')
const contactRoute = require('./Contact')

const app = (route, prefix) => {
    route.use(`${prefix}/users`, userRoute)
    route.use(`${prefix}/contacts`, contactRoute)
}

module.exports = app