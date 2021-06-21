const route = require('express').Router()
const chatListController = require('../controller/Chatlist')
const verifyToken = require('../helper/verifyToken')

route.get('/:user_id', verifyToken, chatListController.getChatListByUserId)  
route.post('/:user', chatListController.addChatListByUserId) 
// route.post('/:user_id', contactListController.addNewContactList) 
// route.patch('/:id', contactListController.updateContactNameById) 
route.delete('/:id', chatListController.deleteChatListByUserId) 


module.exports = route