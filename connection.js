const mysql = require('mysql');

//Create Connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'php-pagination'
});

//Connection
db.connect(err => {
    if(err) throw err;
    console.log('Connected to MySQL');
});

module.exports = db;