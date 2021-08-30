require('dotenv').config();
const { Pool } = require('pg');
const isProoduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`

const pool = new Pool({
    connectionString: isProoduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProoduction
});

module.exports = pool