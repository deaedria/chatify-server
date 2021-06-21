const route = require('express').Router()
const contactController = require('../controller/Contact')

route.get('/search', contactController.searchContactByName)  
route.get('/:id', contactController.getContactById) 
route.get('/', contactController.getAllContact)
route.post('/', contactController.refreshContact) 


module.exports = route