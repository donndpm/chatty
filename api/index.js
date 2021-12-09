const express = require('express')
const bodyParser = require('body-parser')
const PORT = 3001
const app = express()
const db = require('./models')
const AuthRoute = require('./routes/auth.route')

//db.sequelize.sync({force:true}).then(()=> initial())
db.sequelize.sync()

function initial() {
    db.role.create({
        id: 1,
        name: 'user'
    })

    db.role.create({
        id: 2,
        name: 'admin'
    })

    db.role.create({
        id: 3,
        name: 'moderator'
    })
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('./routes/auth.route')(app)

app.get('/api', (req, res) => {
    return res.status(200).send({
        message: 'Its working!' + req.body.user
    })
})

app.listen(PORT || 3001, () => {
    console.log('App is running in PORT ' + PORT)
})