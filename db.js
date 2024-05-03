const sequelize =  require('sequelize');
const db = new sequelize({
    dialect: 'sqlite',
    storage: './auth.sqlite3',
});

module.exports = db;
