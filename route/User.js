const route = require('express').Router()
const userController = require('../controller/User')

route.get('/', userController.getAllUser) //route nya nanti : /users
route.get('/:id', userController.getById) 
route.get('/:email', userController.getByEmail) 
route.post('/:name', userController.searchByName) 
route.post('/', userController.addNewUser) 
route.patch('/:username', userController.updateUser) 
route.delete('/:username', userController.deleteUser) 


module.exports = route