const db = require('../helper/connector')

const messageListModel = {
    getMessageByUserIdAndContactId: (req) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT single_chat_message.scm_id, single_chat_message.content, single_chat_message.sender_id, single_chat_message.status, single_chat_message.time, contacts_list.contact_name, contacts_list.friend_photo, users.photo_profile 
            FROM contacts_list LEFT JOIN single_chat_message ON contacts_list.contact_id = ${req.query.contact_id} AND contacts_list.user_id = ${req.query.id} AND single_chat_message.contact_account = ${req.query.contact_id} AND single_chat_message.user_account = ${req.query.id} JOIN users
            ON users.user_id = ${req.query.id} WHERE single_chat_message.content IS NOT NULL ORDER BY single_chat_message.time ASC`, (err, result) => {
                if (result?.rows.length < 1) {
                    reject({ message: `message not found`, status: 400, data: [] })
                }
                if (!err) {
                    resolve({ message: 'get all message success', status: 200, data: result.rows })
                } else {
                    reject({ message: `get message error ${err}`, status: 500, data: [] })
                }
            })
        })
    },

    addNewMessageForUser: (req, res) => {
        return new Promise((resolve, reject) => {
            const { content, sender_id } = req.body
            db.query(`SELECT sc_id FROM single_chat where user_id= '${req.query.id}' AND contact_id= '${req.query.contact_id}'`, (error, result) => {
                if (!error) {
                    const sc_id1 = result.rows[0] ? result.rows[0].sc_id : null;
                    db.query(`SELECT sc_id FROM single_chat where user_id= '${req.query.contact_id}' AND contact_id= '${req.query.id}'`, (error1, result1) => {
                        if (!error) {
                            const sc_id2 = result1.rows[0] ? result1.rows[0].sc_id : null;
                            const status = 'unread'
                            const file = req.file?.filename ? `/uploads/content/${req.file.filename}` : null
                            
                            let newBody = {...req.body, content: file}

                            db.query('INSERT INTO single_chat_message(sc_id, content, time, status, user_account, contact_account, sender_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [sc_id1, file ? newBody.content : content, `NOW()`, status, req.query.id, req.query.contact_id, sender_id], (err1, response1) => {
                                db.query('INSERT INTO single_chat_message(sc_id, content, time, status, user_account, contact_account, sender_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [sc_id2, file ? newBody.content : content, `NOW()`, status, req.query.contact_id, req.query.id, sender_id], (err2, response2) => {
                                    if (!err1 && !err2) {
                                        db.query("UPDATE single_chat SET last_message=$1, last_time=$2 WHERE sc_id=$3", [file ? newBody.content : content, `NOW()`, sc_id1], (err3, res) => {
                                            db.query("UPDATE single_chat SET last_message=$1, last_time=$2 WHERE sc_id=$3", [file ? newBody.content : content, `NOW()`, sc_id2], (err4, res) => {
                                                if (!err4) {
                                                    const response = { data1: response1.rows[0], data2: response2.rows[0] }
                                                    resolve({ message: 'message has been created', status: 201, data: response })
                                                    // resolve({ message: 'message has been created', status: 201, data2: response1.rows[0] })
                                                    // resolve({message: `update user id ${id} success`, status: 200, data: response.rows[0]})
                                                } else {
                                                    reject({ message: 'create data failed', status: 500, data: err })
                                                }
                                            })
                                            // resolve({ message: 'message has been created', status: 201, data: response.rows[0] })
                                        })
                                    } else {
                                        reject({ message: 'create data failed', status: 500, data: err1 })
                                    }
                                })
                            })
                        } else {
                            reject({ message: 'create data failed', status: 500, data: error })
                        }
                    })


                } else {
                    reject({ message: `add message failed`, status: 500 })
                }
            });
        });
    },
    // addNewMessageForUser: (req, res) => {
    //     return new Promise((resolve, reject) => {
    //         const {content, sender_id} = req.body
    //         db.query(`SELECT sc_id FROM single_chat where user_id= '${req.query.id}' AND contact_id= '${req.query.contact_id}'`, (error, result) => {
    //             if (!error) {
    //                 const sc_id = result.rows[0] ? result.rows[0].sc_id : null;
    //                 const status = 'unread'

    //                 db.query('INSERT INTO single_chat_message(sc_id, content, time, status, user_account, contact_account, sender_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [sc_id, content, `NOW()`, status, req.query.id, req.query.contact_id, sender_id], (err, response) => {
    //                     if (!err) {
    //                         db.query("UPDATE single_chat SET last_message=$1, last_time=$2 WHERE sc_id=$3", [content, `NOW()`, sc_id], (err1, res) => {                        
    //                             if(!err1){ 
    //                                 resolve({ message: 'message has been created', status: 201, data: response.rows[0] })
    //                                 // resolve({message: `update user id ${id} success`, status: 200, data: response.rows[0]})
    //                             }else{
    //                                 reject({message: 'create data failed', status: 500, data: err})
    //                             }
    //                         })
    //                         // resolve({ message: 'message has been created', status: 201, data: response.rows[0] })
    //                     } else {
    //                         reject({ message: 'create data failed', status: 500, data: err })
    //                     }
    //                 })
    //             } else {
    //                 reject({ message: `add message failed`, status: 500 })
    //             }
    //         });
    //     });
    // },

    addNewMessageForContact: (req, res) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT sc_id FROM single_chat where user_id= '${req.query.contact_id}' AND contact_id= '${req.query.id}'`, (error, result) => {
                if (!error) {
                    const sc_id = result.rows[0] ? result.rows[0].sc_id : null;
                    const status = 'unread'
                    const { content, sender_id } = req.body
                    db.query('INSERT INTO single_chat_message(sc_id, content, time, status, user_account, contact_account, sender_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [sc_id, content, `NOW()`, status, req.query.contact_id, req.query.id, sender_id], (err, response) => {
                        if (!err) {
                            db.query("UPDATE single_chat SET last_message=$1, last_time=$2 WHERE sc_id=$3", [content, `NOW()`, sc_id], (err1, res) => {
                                if (!err1) {
                                    resolve({ message: 'message has been created', status: 201, data: response.rows[0] })
                                    // resolve({message: `update user id ${id} success`, status: 200, data: response.rows[0]})
                                } else {
                                    reject({ message: 'create data failed', status: 500, data: err })
                                }
                            })
                            // resolve({ message: 'message has been created', status: 201, data: response.rows[0] })
                        } else {
                            reject({ message: 'create data failed', status: 500, data: err })
                        }
                    })
                } else {
                    reject({ message: `add message failed`, status: 500 })
                }
            });
        });
    },

    deleteMessageById: (req)=> {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM single_chat_message WHERE scm_id = '${req.id}' RETURNING *`, (err, result) => {
                if(!err) {
                    const checkId = result.rows[0]?.scm_id;
                    if(req.id == checkId) {
                        resolve({message: 'delete success', status: 200, data: result.rows[0]})
                    }else{
                        reject({message: `message id: ${req.id} not found`, status: 400, data: {}})
                    }
                }else{
                    reject({message: 'update data failed', status: 500, data: err})
                }
            })
        })
    },
    
    searchMessage: (req)=> {
        return new Promise((resolve, reject) => {
            const textName = req.query.keyword.toLowerCase();
            db.query(`SELECT single_chat_message.scm_id, single_chat_message.content, single_chat_message.time, last_time,
            contacts_list.contact_name, contacts_list.friend_photo,
            single_chat.contact_id, single_chat.notification, single_chat.last_message FROM contacts_list 
            LEFT JOIN single_chat ON single_chat.user_id = ${req.query.id} AND 
            single_chat.user_id = contacts_list.user_id AND single_chat.contact_id = contacts_list.contact_id 
            LEFT JOIN single_chat_message ON single_chat_message.sc_id = single_chat.sc_id 
            WHERE single_chat.contact_id is not null AND LOWER(single_chat_message.content) LIKE 
            '%${textName}%' ORDER BY single_chat_message.time DESC`, (err, result) => {
                if(!err) {
                    resolve({message: 'get all messages success', status: 200, data: result.rows})
                }else{
                    reject({message: `get messages error ${err}`, status: 500, data: []})
                }
            })
        })  
    },

    updateStatusMessageById: (req, res)=> {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM single_chat_message WHERE sc_id = '${req.query.id}'`, (error, result) => {
                if(result?.rows == '' || result?.rows.length < 1) {
                    reject({message: `message id not found`, status: 400, data: {}})
                }
                if(!error) {
                    const {id,sender_id,contact_id} = req.query;
                    db.query("UPDATE single_chat_message SET status=$1 WHERE (sc_id=$2 AND sender_id=$3) OR (contact_account=$4 AND sender_id=$5) RETURNING *", ['read', id, sender_id, contact_id, sender_id ], (err, response) => {                        
                        if(!err){ 
                            resolve({message: `update sc_id ${id} with sender_id ${sender_id} and contact_id ${contact_id} success`, status: 200, data: response.rows})
                        }else{
                            reject({message: 'update data failed', status: 500, data: err})
                        }
                    })
                }else{
                    reject({message: 'update data failed', status: 500, data: error})
                }           
            })
        })        
    },
}

module.exports = messageListModel