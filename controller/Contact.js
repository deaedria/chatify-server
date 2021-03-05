const contactModel = require('../model/Contact');

const contactController = {
    getAllContact: async(req, res) => {
        try {
            const result = await contactModel.getAllContact()
            res.status(200).send({
                message: 'success get all contacts',
                status: 200,
                data: result,
            })
        } catch (error) {
            res.status(500).send({
                message: `get contacts error ${error}`,
                status: 500,
                data: [],
            })
        }
    },

    getById: async(req, res) => {
        try {
            const result = await contactModel.getById(req)
            res.status(200).send({
                message: 'success get by Id',
                status: 200,
                data: result,
            })
        } catch (error) {
            res.status(500).send({
                message: `get contact error ${error}`,
                status: 500,
                data: [],
            })
        }
    },
}

module.exports = contactController