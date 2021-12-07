module.exports = {
    HOST: 'localhost',
    DB: 'chatty_db',
    USER: 'root',
    PASSWORD: '242642',
    PORT: 5432,
    DIALECT: 'postgres',
    pool: {
        MAX: 5,
        MIN: 0,
        ACQUIRE: 30000,
        IDLE: 10000
    }
}