// import { Pool } from 'pg';
// import pg from 'pg';
// if (process.env.DATABASE_URL || process.env.TEST_DATABASE_URL) {
// 	pg.defaults.ssl = true;
// }
// const productionConfig = {
// 	connectionString: process.env.DATABASE_URL,
// 	ssl: true
// };

// const testConfig = {
// 	connectionString: process.env.TEST_DATABASE_URL,
// 	ssl: true
// };
// const getConnectionString = () => {
// 	if (process.env.NODE_ENV === 'test') {
// 		return testConfig;
// 	}
// 	else if (process.env.NODE_ENV === 'development') {
// 		return productionConfig;
// 	}
// 	else if (process.env.NODE_ENV === 'production') {
// 		return productionConfig;
// 	}
// };
// const pool = new Pool(getConnectionString());
// export default pool;

////////////////////////////////////////
const getDatabase = () => {
	if (process.env.NODE_ENV === 'test') {
		return process.env.TESTDATABASE;
	}
	else if (process.env.NODE_ENV === 'development') {
		return process.env.DATABASE;
	}
	else if (process.env.NODE_ENV === 'production') {
		return process.env.DATABASE;
	}
	else {
		return process.env.TESTDATABASE;
	}
};
import { Pool } from 'pg';
const pool = new Pool(getDatabase());

export default pool;
