const db = require('../helper/connector')

const contactModel = {
    getAllContact: ()=> {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM contacts`, (err, result) => {
                if(!err) {
                    resolve(result.rows)
                }else{
                    reject(err)
                }
            })
        })
    },

    getById: (req)=> {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM contacts WHERE contact_id = ${req.params.id}`, (err, result) => {
                if(!err) {
                    resolve(result.rows[0])
                }else{
                    reject(err)
                }
            })
        })
    },
}

module.exports = contactModel