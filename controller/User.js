const userModel = require('../model/User');

const userController = {
    getAllUser: async(req, res) => {
        try {
            const result = await userModel.getAllUser()
            res.status(200).send({
                message: 'success get all users',
                status: 200,
                data: result,
            })
        } catch (error) {
            res.status(500).send({
                message: `get users error ${error}`,
                status: 500,
                data: [],
            })
        }
    },

    getById: async(req, res) => {
        try {
            const result = await userModel.getById(req.params)
            res.status(200).send({
                message: 'success get by Id',
                status: 200,
                data: result,
            })
        } catch (error) {
            res.status(500).send({
                message: `get user error ${error}`,
                status: 500,
                data: [],
            })
        }
    },

    getByEmail: async(req, res) => {
        try {
            const result = await userModel.getByEmail(req.params)
            res.status(200).send({
                message: 'success get by Email',
                status: 200,
                data: result,
            })
        } catch (error) {
            res.status(500).send({
                message: `get user error ${error}`,
                status: 500,
                data: [],
            })
        }
    },

    deleteUser: async(req, res) => {
        try {
            const result = await userModel.deleteUser(req)
            res.status(200).send({
                message: `delete success`,
                status: 200,
                data: result,
            })
        } catch (error) {
            res.status(500).send({
                message: 'update data failed',
                status: 500,
            })
        }
    },

    addNewUser: async(req, res) => {
        try {
            const result = await userModel.addNewUser(req, res);
            res.status(201).send({
                message: `user has been created`,
                status: 201,
                data: result
            })
        } catch (error) { error }
    },

    updateUser: async(req, res) => {
        try {
            const result = await userModel.updateUser(req, res);
            result;
        } catch (error) { error }
    },

    searchByName: async(req, res) => {
        try {
            const result = await userModel.searchByName(req.body.name);
            res.status(200).send({
                message: 'success get users',
                status: 200,
                data: result,
            })
        } catch (error) { 
            res.status(500).send({
                message: `get user error ${error}`,
                status: 500,
                data: [],
            })
        }
    },
}

module.exports = userController