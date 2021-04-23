const route = require('express').Router()
const messageListController = require('../controller/Message')
const formUpload = require('../helper/formUpload')
const verifyToken = require('../helper/verifyToken')
 
route.post('/:key', verifyToken, formUpload.uploadImage, messageListController.addNewMessageForUser) 
// route.post('/:user_id', verifyToken, messageListController.addNewMessageForContact) 
route.get('/:key', verifyToken, messageListController.getMessageByUserIdAndContactId)  
// route.post('/:user_id', contactListController.addNewContactList) 
// route.patch('/:id', contactListController.updateContactNameById) 
// route.delete('/:id', contactListController.deleteContactListById) 


module.exports = route