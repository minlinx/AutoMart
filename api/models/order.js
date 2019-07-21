import pool from '../../dbConifg';
class Users {
	static async insertIntoDatabase(parsedCarId, parsedId, parsedPrice) {
		const createdOn = new Date();
		const sql = 'INSERT INTO orders(buyer, car_id, amount, status, created_on) VALUES ($2, $1, $5, $3, $4) RETURNING *';
		const params = [parsedCarId, parsedId, 'pending', createdOn, parsedPrice];
		try {
			return await pool.query(sql, params);
		} catch (error) {
			throw error;
		}
	}
	static async getPriceFromCarsTable(parsedCarId) {
		const sql = 'SELECT price FROM cars WHERE id=$1';
		const param = [parsedCarId];
		try {
			return await pool.query(sql, param);
		} catch (error) {
			throw error;
		}
	}
	static async getAmoutFromOrdersTable(parsedOrderId) {
		const sql = 'SELECT amount FROM orders WHERE id=$1';
		const param = [parsedOrderId];
		try {
			return await pool.query(sql, param);
		} catch (error) {
			throw error;
		}
	}
	static async changeOrderPrice(parsedPrice, parsedOrderId, parsedId) {
		const sql = 'UPDATE orders SET amount=$1 WHERE id=$2 AND buyer=$3 RETURNING *';
		const params = [parsedPrice, parsedOrderId, parsedId];
		try {
			return await pool.query(sql, params);
		} catch (error) {
			throw error;
		}
	}
}
export default Users;
