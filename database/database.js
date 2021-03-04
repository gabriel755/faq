const sequelize = require("sequelize");

const connection = new sequelize('guia_perguntas','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;