const sql = require('mysql2/promise');

const pool = sql.createPool({
    host:"localhost",
    user:'root',
    database:`doctorappointment`,
    password:'1234'
})

pool
module.exports = pool;