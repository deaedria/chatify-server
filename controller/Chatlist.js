const formResponse = require('../helper/formResponse')
const chatListModel = require('../model/ChatList');

const chatListController = {
    getChatListByUserId: async(req, res) => {
        try {
            const result = await chatListModel.getChatListByUserId(req)
            formResponse(result, res)
        } catch (error) {
            formResponse(error, res)
        }
    },

    addChatListByUserId: async(req, res) => {
        try {
            const result = await chatListModel.addChatListByUserId(req);
            formResponse(result, res)
        } catch (error) {
            formResponse(error, res)
        }
    },

    deleteChatListByUserId: async(req, res) => {
        try {
            const result = await chatListModel.deleteChatListByUserId(req.params)
            formResponse(result, res)
        } catch (error) {
            formResponse(error, res)
        }
    },

}

module.exports = chatListController