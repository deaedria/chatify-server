const route = require('express').Router()
const contactController = require('../controller/Contact')

route.get('/', contactController.getAllContact) //route nya nanti : /contacts
route.get('/:id', contactController.getById) 
// route.get('/:email', userController.getByEmail) 
// route.post('/:name', userController.searchByName) 
// route.post('/', userController.addNewUser) 
// route.patch('/:username', userController.updateUser) 
// route.delete('/:username', userController.deleteUser) 


module.exports = route