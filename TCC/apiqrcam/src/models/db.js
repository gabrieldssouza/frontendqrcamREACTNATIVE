const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bancoqrcam'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no banco de dados: ' + err);
        return;
    }
});

module.exports = db;