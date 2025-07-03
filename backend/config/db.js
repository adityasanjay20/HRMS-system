const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: 1433,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {

        trustServerCertificate: true,
        encrypt: false
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => {
        console.error("!!! DATABASE CONNECTION FAILED !!!");
        console.error("This is the final error, please check your configuration carefully:", err);
    });

module.exports = {
    sql, poolPromise
};