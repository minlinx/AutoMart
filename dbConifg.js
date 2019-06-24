// import { Pool } from 'pg';
// const pool = new Pool({
// 	host: process.env.PGHOST,
// 	database: process.env.PGDATABASE,
// 	password: process.env.PGPASSWORD,
// 	port: process.env.PGPORT,
// });
// export default pool;


import { Client } from 'pg';

const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: true,
});
export default client;
