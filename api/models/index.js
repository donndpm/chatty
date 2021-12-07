const config = require('../config/db.config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
    host: config.HOST,
    port: config.PORT,
    dialect: config.DIALECT,
    pool: {
        maxConnection: config.pool.MAX,
        minConnection: config.pool.MIN,
        maxIdleTime: config.pool.IDLE,
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./user.model')(sequelize, Sequelize)
db.role = require('./role.model')(sequelize, Sequelize)

db.user.belongsToMany(db.role, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId'
})

db.role.belongsToMany(db.user, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId'
})

db.ROLES = ['user', 'admin', 'moderator']

module.exports = db

