const mysql = require('mysql2');

const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'agenda'
}

const connection = mysql.createConnection(config);

connection.connect(function(err){
    if (err) throw (err);
    console.log('Conexión exitosa!!')
});

module.exports = connection;