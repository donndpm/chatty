const db = require('../models')

const verifySignUp = (req, res, next) => {
    const username = req.body.username
    const email = req.body.email

    //check if username already exists
    db.user.findOne({
        where: {
            username: username
        }
    }).then(user => {
        if(user) {
            return res.status(400).send({
                message: 'Username already taken!'
            })
        }

        //check if email already exists
        db.user.findOne({
            where: {
                email: email
            }
        }).then(email => {
            if(email) {
                return res.status(400).send({
                    message: 'Email already taken!'
                })
            }

            //next() - verify signup pass
            next()
        })
    })
}

const verifySignIn = (req, res, next) => {
    db.user.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if(!user) {
            return res.status(400).send({
                message: 'Invalid username!'
            })
        }

        next()
    })
}

const AuthMiddleware = {
    verifySignIn,
    verifySignUp
}

module.exports = AuthMiddleware