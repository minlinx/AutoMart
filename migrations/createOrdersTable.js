import pool from '../dbConifg';
import dummyData from './dummyData';

const createDummyCar = async () => {
	const client = await pool.connect();
	try {
		const sql = 'INSERT INTO orders(buyer, car_id, amount, status, created_on) VALUES ($1, $2, $3, $4, $5) RETURNING *';
		const params = dummyData.order;
		const results = await client.query(sql, params);
		console.log(results.rowCount);
	} catch (error) {
		console.log('From create orders table', error.stack);
	} finally {
		client.release();
	}
};

(async () => {
	const client = await pool.connect();
	try {
		const sql =
			'CREATE TABLE IF NOT EXISTS orders(id serial PRIMARY KEY, buyer INT NOT NULL, car_id INT NOT NULL, amount NUMERIC NOT NULL, status VARCHAR (255) NOT NULL, created_on DATE NOT NULL);';
		const results = await client.query(sql);
		console.log(results.rowCount);
	} catch (error) {
		console.log('From create orders table', error.stack);
	} finally {
		client.release();
	}
	createDummyCar();
})();
