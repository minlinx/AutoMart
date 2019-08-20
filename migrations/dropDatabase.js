import pool from '../dbConifg';

(async () => {
	const client = await pool.connect();
	try {
		const sql = 'DROP TABLE IF EXISTS cars; DROP TABLE IF EXISTS users; DROP TABLE IF EXISTS flags; DROP TABLE IF EXISTS orders';
		const results = await client.query(sql);
		console.log(results.rowCount);
	} catch (error) {
		console.log('From drop table', error.stack);
	} finally {
		client.release();
	}
})();

// import pool from '../dbConifg';
// (async () => {
// 	const client = await pool.connect();
// 	try {
// 		const sql = 'DROP TABLE IF EXISTS cars; DROP TABLE IF EXISTS users; DROP TABLE IF EXISTS flags; DROP TABLE IF EXISTS orders';
// 	} catch (error) {
// 		console.log(error);
// 	}finally {
// 		client.release(error)
// 	}
// })()
// export default pool;
