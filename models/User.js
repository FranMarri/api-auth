const db = require ('../db');
const {DataTypes} = require ('sequelize');

const User = db.define('user',{
    username: {
    type: DataTypes.STRING,
    allowNull: false,

},
email: {
    type:DataTypes.STRING,
    allowNull: false,
},
password: {
    type:DataTypes.STRING,
    allowNull: false,

},


});

module.exports = User;
