import pool from '../../dbConifg';
class Users {
	static async insertIntoDatabase(userData) {
		const { email, password, first_name, last_name, address } = userData;
		const regex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(automart)\.com$/g;
		const isAdmin = regex.test(email);
		const sql = 'INSERT INTO users (email, password, first_name, last_name, address, is_admin)  VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
		const params = [email, password, first_name, last_name, address, isAdmin];
		try {
			return await pool.query(sql, params);
		} catch (error) {
			throw error;
		}
	}

	static async getUserData(email) {
		const sql = 'SELECT * FROM users WHERE email = $1';
		const params = [email];
		try {
			return await pool.query(sql, params);
		} catch (error) {
			throw error;
		}
	}
	static async getUserEmail(email) {
		const sql = 'SELECT email FROM users WHERE email = $1';
		const params = [email];
		try {
			return await pool.query(sql, params);
		} catch (error) {
			throw error;
		}
	}
}
export default Users;
