const mysql = require('mysql2');

const config = {
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '1234',
    database: 'agenda3'
}

const connection = mysql.createConnection(config);

connection.connect(function(err){
    if (err) throw (err);
    console.log('Conexión exitosa!!')
});

module.exports = connection;