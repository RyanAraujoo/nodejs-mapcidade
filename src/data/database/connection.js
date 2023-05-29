const mysql = require('mysql');
 const mysql_connection = mysql.createConnection({
    client: 'mysql',
    connection: {
        host : "localhost",
        user : "root",
        password : "",
        database : "mapcidade"
     }
});
module.exports = mysql_connection 
