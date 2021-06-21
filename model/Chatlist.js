const db = require('../helper/connector')

const chatListModel = {
    getChatListByUserId: (req) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT last_time, contacts_list.contact_name, contacts_list.friend_photo, single_chat.sc_id, single_chat.contact_id, single_chat.notification, single_chat.last_message FROM contacts_list LEFT JOIN single_chat ON single_chat.user_id = ${req.query.id} AND single_chat.user_id = contacts_list.user_id AND single_chat.contact_id = contacts_list.contact_id WHERE single_chat.contact_id is not null ORDER BY last_time DESC`, (err, result) => {
                if (result?.rows.length < 1) {
                    reject({ message: `chat list not found`, status: 400, data: [] })
                }
                if (!err) {
                    resolve({ message: 'get all chat list success', status: 200, data: result.rows })
                } else {
                    reject({ message: `get chat list error ${err}`, status: 500, data: [] })
                }
            })
        })
    },

    addChatListByUserId: (req) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM single_chat WHERE user_id = ${req.query.user_id} AND contact_id = ${req.query.contact_id}`, (err, res) => {
                if (res.rows.length > 0) {
                    reject({ message: `chat list found`, status: 400, data: [] })
                } else {
                    db.query('INSERT INTO single_chat(user_id, contact_id) VALUES($1,$2)', [req.query.user_id, req.query.contact_id], (error1, result1) => {
                        db.query(`SELECT * FROM single_chat WHERE user_id = ${req.query.contact_id} AND contact_id = ${req.query.user_id}`, (error, result) => {
                            if (!error) {
                                if (result.rows.length > 0) {
                                    resolve({ message: 'new chat has been created', status: 201, data: result1.rows[0] })
                                } else {
                                    db.query('INSERT INTO single_chat(user_id, contact_id) VALUES($1,$2)', [req.query.contact_id, req.query.user_id], (error2, result2) => {
                                        if (!error2) {
                                            resolve({ message: 'new chats has been created', status: 201, data: result2.rows[0] })
                                        } else {
                                            reject({ message: 'create data failed', status: 500, data: error2 })
                                        }
                                    })
                                }
                            } else {
                                reject({ message: 'create data failed', status: 500, data: error })
                            }
                        })
                    })
                }
            })
        })
    },

    deleteChatListByUserId: (req) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM single_chat_message WHERE sc_id = '${req.id}' RETURNING *`, (error, result) => {
                db.query(`DELETE FROM single_chat WHERE sc_id = '${req.id}' RETURNING *`, (err, res) => {
                    if (!err) {
                        const checkId = res.rows[0]?.sc_id;
                        if (req.id == checkId) {
                            resolve({ message: 'delete success', status: 200, data: res.rows[0] })
                        } else {
                            reject({ message: `chat id: ${req.id} not found`, status: 400, data: {} })
                        }
                    } else {
                        reject({ message: 'delete data failed', status: 500, data: err })
                    }
                })
            })
        })
    },

}

module.exports = chatListModel