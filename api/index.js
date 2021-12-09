const express = require('express')
const bodyParser = require('body-parser')
const PORT = 3001
const app = express()
const db = require('./models')
const AuthRoute = require('./routes/auth.route')

db.sequelize.sync()

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