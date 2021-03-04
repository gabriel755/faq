const sequelize = require("sequelize");

const connection = new sequelize('faq_rechcenter','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;