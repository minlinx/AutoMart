// import { Pool } from 'pg';
// const pool = new Pool({
// 	host: process.env.PGHOST,
// 	database: process.env.PGDATABASE,
// 	password: process.env.PGPASSWORD,
// 	port: process.env.PGPORT,
// });
// export default pool;

/////////////////////////////////////////////////////////////////////
import { Client } from 'pg';

const pool = new Client({
	connectionString: process.env.DEV_DATABASE_URL,
	ssl: true,
});
export default pool;

////////////////////////////////////////////////////////////////////
// import { Client } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

// const defaultConfig = {
// 	connectionString: process.env.DEV_DATABASE_URL,
// 	ssl: true
// };

// const productionConfig = {
// 	connectionString: process.env.PROD_DATABASE_URL,
// 	ssl: true
// };

// const testConfig = {
// 	connectionString: process.env.TEST_DATABASE_URL,
// 	ssl: true
// };
// const getConf = () => {
// 	switch (process.env.NODE_ENV) {
// 	case 'test':
// 		return testConfig;
// 	case 'production':
// 		return productionConfig;
// 	case 'development':
// 		return productionConfig;
// 	default:
// 		return productionConfig;
// 	}
// };
// const pool = new Client(getConf());

// export default pool;
