const db = require('../helper/connector')

const userModel = {
    getAllUser: ()=> {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users`, (err, result) => {
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
            db.query(`SELECT * FROM users WHERE user_id = ${req.id}`, (err, result) => {
                if(!err) {
                    resolve(result.rows[0])
                }else{
                    reject(err)
                }
            })
        })
    },

    getByEmail: (req)=> {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE email = ${req.email}`, (err, result) => {
                if(!err) {
                    resolve(result.rows[0])
                }else{
                    reject(err)
                }
            })
        })
    },

    deleteUser: (req)=> {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM users WHERE username = '${req.params.username}' RETURNING *`, (err, result) => {
                if(!err) {
                    resolve(result.rows[0])
                }else{
                    reject(err)
                }
            })
        })
    },

    addNewUser: (req, res)=> {
        return new Promise((resolve, reject) => {
        const {name, phone, photo_profile, username, email, password, bio} = req.body
            db.query(`SELECT * FROM users where username= '${username}'`, (error, result) => {
                if(!error) {
                    const checkUsername = result.rows[0] ? result.rows[0].username : null; 
                    const checkPhone = result.rows[0] ? result.rows[0].phone : null; 
                    const checkEmail = result.rows[0] ? result.rows[0].email : null; 
                    // console.log(checkPhone)
                    if(username == checkUsername) {
                        reject( 
                            res.status(400).send({
                            message: 'username exists',
                            status: 400,
                        }))
                    }else {
                        if((phone == null) || (checkPhone != null)) {
                            reject(
                                res.status(400).send({
                                message: 'phone is required or exists',
                                status: 400,
                            }))
                        }else if((email == null) || checkEmail != null){ 
                            reject(
                                res.status(400).send({
                                message: 'email is required or exists',
                                status: 400,
                            }))
                        }else{
                            db.query('INSERT INTO users(name, phone, photo_profile, username, email, password, bio) VALUES ($1, $2, $3, $4, $5, $6, $7)', [name, phone, photo_profile, username, email, password, bio]), (err, result) => {
                                if(!err) {
                                    resolve( result.rows[0] )
                                }else{
                                    reject(
                                        res.status(500).send({
                                        message: 'create data failed',
                                        status: 500,
                                    }))
                                }
                            }
                        }
                    }
                }
            })
        })
    },

    updateUser: (req, res)=> {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE username = '${req.params.username}'`, (error, result) => {
                if(result.rows == '' || result.rows.length < 1) {
                    reject(
                        res.status(400).send({
                        message: 'username not found',
                        status: 400,
                    }))
                }
                if(!error) {
                    const {
                        name = result.rows[0] ? result.rows[0].name : null, 
                        phone = result.rows[0] ? result.rows[0].phone : null, 
                        photo_profile = result.rows[0] ? result.rows[0].photo_profile : null, 
                        email = result.rows[0] ? result.rows[0].email : null, 
                        password = result.rows[0] ? result.rows[0].password : null, 
                        bio = result.rows[0] ? result.rows[0].bio : null, 
                    } = req.body
                    const {username} = req.params;
                    db.query("UPDATE users SET name=$1, phone=$2, photo_profile=$3, username=$4, email=$5, password=$6, bio=$7 WHERE username=$8", [name, phone, photo_profile, username, email, password, bio, username]), (err) => {                        
                        if(!err){ 
                            resolve(
                                res.status(200).send({
                                message: `update username ${username}`,
                                status: 200,
                            }))
                        }else{
                            reject(
                                res.status(500).send({
                                message: 'update data failed',
                                status: 500,
                            }))
                        }
                    }
                }                
            })
        })        
    },

    
    searchByName: (req)=> {
        return new Promise((resolve, reject) => {
            const textName = req.toLowerCase();
            db.query(`SELECT * FROM users WHERE LOWER(name) LIKE '${textName}%' ORDER BY LENGTH(name) ASC`, (err, result) => {
                if(!err) {
                    resolve(result.rows)
                }else{
                    reject(err)
                }
            })
        })  
    },

}

module.exports = userModel