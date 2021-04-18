const sequelize = require("sequelize");


const connection = new sequelize('faq_teste','root','',{
    host: 'localhost',
    dialect: 'mysql'
});



module.exports = connection;