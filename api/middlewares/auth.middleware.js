const db = require('../models')

const verifySignUp = (req, res, next) => {

    const roles = req.body.roles
    console.log(roles)

        var roleAddedCnt = 0
            
        roles.map(role => {
            console.log(role)
            ++roleAddedCnt
        })

        console.log(roleAddedCnt)

    //check if username already exists
    db.user.findOne({
        where: {
            username: req.body.username
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
                email: req.body.email
            }
        }).then(email => {
            if(email) {
                return res.status(400).send({
                    message: 'Email already taken!'
                })
            }

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

        res.locals.user = user
        next()
    })
}

const AuthMiddleware = {
    verifySignIn,
    verifySignUp
}

module.exports = AuthMiddleware