import pool from '../dbConifg';
import dummyData from './dummyData';

const createDummyCar = async () => {
	const client = await pool.connect();
	try {
		const sql = 'INSERT INTO flags(car_id, created_on, reason, description) VALUES ($1, $2, $3, $4) RETURNING *';
		const params = dummyData.flag;
		const results = await client.query(sql, params);
		console.log(results.rowCount);
	} catch (error) {
		console.log('fROM create flag table', error.stack);
	} finally {
		client.release();
	}
};

(async () => {
	const client = await pool.connect();
	try {
		const sql =
			'CREATE TABLE IF NOT EXISTS flags(id serial PRIMARY KEY,  car_id INT NOT NULL, created_on DATE NOT NULL, reason VARCHAR NOT NULL, description VARCHAR NOT NULL);';
		const results = await client.query(sql);
		console.log(results.rowCount);
	} catch (error) {
		console.log('From create flag table', error.stack);
	} finally {
		client.release();
	}
	createDummyCar();
})();
