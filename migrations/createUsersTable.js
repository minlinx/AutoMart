import pool from '../dbConifg';
import dummyData from './dummyData';

const createDummyUser = async () => {
	const client = await pool.connect();
	try {
		const sql = 'INSERT INTO users (email, password, first_name, last_name, address, is_admin)  VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
		const params = dummyData.user1;
		const results = await client.query(sql, params);
		console.log(results.rowCount);
	} catch (error) {
		console.log('From create users table', error.stack);
	} finally {
		client.release();
	}
};
const createDummyUser1 = async () => {
	const client = await pool.connect();
	try {
		const sql = 'INSERT INTO users (email, password, first_name, last_name, address, is_admin)  VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
		const params = dummyData.user2;
		const results = await client.query(sql, params);
		console.log(results.rowCount);
	} catch (error) {
		console.log('From create users table', error.stack);
	} finally {
		client.release();
	}
};

(async () => {
	const client = await pool.connect();
	try {
		const sql =
			'CREATE TABLE IF NOT EXISTS users(id serial PRIMARY KEY, email VARCHAR (255) NOT NULL, password VARCHAR (255) NOT NULL,  first_name VARCHAR (255) NOT NULL, last_name VARCHAR (255) NOT NULL, address VARCHAR (255) NOT NULL, is_admin BOOLEAN NOT NULL);';
		const results = await client.query(sql);
		console.log(results.rowCount);
	} catch (error) {
		console.log('From create users table', error.stack);
	} finally {
		client.release();
	}
	createDummyUser();
	createDummyUser1();
})();
