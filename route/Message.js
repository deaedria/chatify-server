const route = require('express').Router()
const messageListController = require('../controller/Message')
const formUpload = require('../helper/formUpload')
const verifyToken = require('../helper/verifyToken')
 
route.post('/:key', verifyToken, formUpload.uploadImage, messageListController.addNewMessageForUser) 
// route.post('/:user_id', verifyToken, messageListController.addNewMessageForContact) 
route.get('/search', verifyToken, messageListController.searchMessage)  
route.get('/:key', verifyToken, messageListController.getMessageByUserIdAndContactId)  
route.delete('/:id', messageListController.deleteMessageById) 
// route.post('/:user_id', contactListController.addNewContactList) 
// route.patch('/:id', contactListController.updateContactNameById) 


module.exports = route