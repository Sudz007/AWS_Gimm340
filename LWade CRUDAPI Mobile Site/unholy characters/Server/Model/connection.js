const mysql = require('mysql2/promise');
// const course = require('./Model/unholy');
let connection = null;


async function query(sql, params) {
    //Singleton DB connection
    if (null === connection) {
        connection = await mysql.createConnection({
            host: 'student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com',
            user: 'laurynwade',
            password: 'ls5Ivh2OvpeseRyLwiteIlGswL0dZ94HF9s',
            database: 'laurynwade'
        });
    }
   
    const [results, ] = await connection.execute(sql, params);


    return results;
}


module.exports = {
    query
}
