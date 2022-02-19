const {Pool} = require("pg");

module.exports.poolInstance = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})