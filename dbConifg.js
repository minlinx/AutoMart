import { pg, Pool } from 'pg';
if (process.env.DATABASE_URL) {
	pg.defaults.ssl = true;
}
const productionConfig = {
	connectionString: process.env.DATABASE_URL,
	ssl: true
};

const testConfig = {
	connectionString: process.env.TEST_DATABASE_URL,
	ssl: true
};
const getConnectionString = () => {
	if (process.env.NODE_ENV === 'test') {
		return testConfig;
	}
	else if (process.env.NODE_ENV === 'development') {
		return productionConfig;
	}
	else if (process.env.NODE_ENV === 'production') {
		return productionConfig;
	}
	else {
		console.log(process.env.NODE_ENV);
	}
};
const pool = new Pool(getConnectionString());

export default pool;
