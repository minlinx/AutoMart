import pool from '../dbConifg';
import dummyData from './dummyData';
(async () => {
	const client = await pool.connect();
	try {
		const sql =
			'CREATE TABLE IF NOT EXISTS cars(id serial PRIMARY KEY, owner INT NOT NULL, created_on DATE NOT NULL, state VARCHAR (255) NOT NULL, status VARCHAR NOT NULL, price NUMERIC NOT NULL, manufacturer VARCHAR (255) NOT NULL, model VARCHAR (255) NOT NULL, body_type VARCHAR (255) NOT NULL, img_url VARCHAR (255) NOT NULL);';
		const results = await client.query(sql);
		console.log(results.rowCount);
	} catch (error) {
		console.log('From create cars table', error.stack);
	} finally {
		client.release();
	}
	createDummyCarAd();
	createDummyCarAd1();
	createDummyCarAd2();
	createDummyCarAd3();
})();

(async () => {
	const client = await pool.connect();
	try {
		const sql = 'CREATE TABLE IF NOT EXISTS cars(id serial PRIMARY KEY, owner INT NOT NULL, created_on DATE NOT NULL, state VARCHAR (255) NOT NULL, status VARCHAR NOT NULL, price NUMERIC NOT NULL, manufacturer VARCHAR (255) NOT NULL, model VARCHAR (255) NOT NULL, body_type VARCHAR (255) NOT NULL, img_url VARCHAR (255) NOT NULL);';
		const results = await client.query(sql);
		console.log(results.rowCount);
	} catch (error) {
		console.log('From Create Cars Table Function', error.stack);
	} finally {
		client.release();
	}
})();

const createDummyCarAd = async () => {
	const client = await pool.connect();
	try {
		const sql = 'INSERT INTO cars(owner, created_on, state, status, price, manufacturer, model, body_type, img_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
		const params = dummyData.car;
		const results = await client.query(sql, params);
		console.log(results.rowCount);
	} catch (error) {
		console.log('From create cars table', error.stack);
	} finally {
		client.release();
	}
};
const createDummyCarAd3 = async () => {
	const client = await pool.connect();
	try {
		const sql = 'INSERT INTO cars(owner, created_on, state, status, price, manufacturer, model, body_type, img_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
		const params = dummyData.car1;
		const results = await client.query(sql, params);
		console.log(results.rowCount);
	} catch (error) {
		console.log('From create cars table', error.stack);
	} finally {
		client.release();
	}
};
const createDummyCarAd1 = async () => {
	const client = await pool.connect();
	try {
		const sql = 'INSERT INTO cars(owner, created_on, state, status, price, manufacturer, model, body_type, img_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
		const params = dummyData.car2;
		const results = await client.query(sql, params);
		console.log(results.rowCount);
	} catch (error) {
		console.log('From create cars table', error.stack);
	} finally {
		client.release();
	}
};
const createDummyCarAd2 = async () => {
	const client = await pool.connect();
	try {
		const sql = 'INSERT INTO cars(owner, created_on, state, status, price, manufacturer, model, body_type, img_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
		const params = dummyData.car3;
		const results = await client.query(sql, params);
		console.log(results.rowCount);
	} catch (error) {
		console.log('From create cars table', error.stack);
	} finally {
		client.release();
	}
};

