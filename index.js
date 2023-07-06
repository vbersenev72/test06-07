const pg = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const config = {
    connectionString: process.env.DB_ACCESS,
    ssl: {
    rejectUnauthorized: true,
    ca: fs
    .readFileSync("/home/<домашняя директория>/.postgresql/root.crt")
    .toString()
    }
    }