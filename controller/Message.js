const formResponse = require('../helper/formResponse')
const messageListModel = require('../model/Message');

const messageListController = {
    getMessageByUserIdAndContactId: async(req, res) => {
        try {
            const result = await messageListModel.getMessageByUserIdAndContactId(req)
            formResponse(result, res)
        } catch (error) {
            formResponse(error, res)
        }
    },

    addNewMessageForUser: async(req, res) => {
        try {
            const result = await messageListModel.addNewMessageForUser(req)
            formResponse(result, res)
        } catch (error) {
            formResponse(error, res)
        }
    },

    addNewMessageForContact: async(req, res) => {
        try {
            const result = await messageListModel.addNewMessageForContact(req)
            formResponse(result, res)
        } catch (error) {
            formResponse(error, res)
        }
    },

}

module.exports = messageListController