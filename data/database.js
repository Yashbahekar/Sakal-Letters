const mysql = require('mysql2/promise');


const pool = mysql.createPool({
     host: 'localhost',
     database: 'sakalintern',
     user:'root',
     password:'Y@sh8485'
});




module.exports = pool;