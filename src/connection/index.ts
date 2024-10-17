import mysql from 'mysql2'

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql123avi#',
    database: 'db_perpus'
});

db.connect((error) => {
    if(error) return console.log('Error' + error.message)
})

export default db;