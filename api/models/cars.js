import pool from '../../dbConifg';
class Cars {
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

	static async getAll() {
		const sql = 'SELECT * FROM cars';
		try {
			return await pool.query(sql);
		} catch (error) {
			throw error;
		}
	}
	static async getCarsWithinPriceRange(status, min_price, max_price) {
		const sql = 'SELECT * FROM cars WHERE status=$1 AND price>=$2 AND price<=$3 AND status=$4';
		const params = [status, min_price, max_price, 'available'];
		try {
			return await pool.query(sql, params);
		} catch (error) {
			throw error;
		}
	}
	static async getCarsByState(state) {
		const sql = 'SELECT * FROM cars WHERE (state=$1)  AND (state=$2 OR state=$3) AND status=$4';
		const params = [state, 'new', 'used', 'available'];
		try {
			return await pool.query(sql, params);
		} catch (error) {
			throw error;
		}
	}
	static async getCarsByStatus(status) {
		const sql = 'SELECT * FROM cars WHERE status=$1';
		const param = [status];
		try {
			return await pool.query(sql, param);
		} catch (error) {
			throw error;
		}
	}
	static async getCarsByStatusAndState(state, status) {
		const sql = 'SELECT * FROM cars WHERE state=$1 AND status=$2 AND status=$3';
		const params = [state, status, 'available'];
		try {
			return await pool.query(sql, params);
		} catch (error) {
			throw error;
		}
	}
	static async getCarsByStatusAndManufacturer(manufacturer, status) {
		const sql = 'SELECT * FROM cars WHERE manufacturer=$1  AND status=$2 AND status=$3';
		const params = [manufacturer, status, 'available'];
		try {
			return await pool.query(sql, params);
		} catch (error) {
			throw error;
		}
	}
	static async getCarsByBodyType(body_type) {
		const sql = 'SELECT * FROM cars WHERE body_type=$1  AND status=$2';
		const params = [body_type, 'available'];
		try {
			return await pool.query(sql, params);
		} catch (error) {
			throw error;
		}
	}
	static async getSpecificCar(parsedCarId) {
		const sql = 'SELECT * FROM cars WHERE id=$1';
		const param = [parsedCarId];
		try {
			return await pool.query(sql, param);
		} catch (error) {
			throw error;
		}
	}
	static async postCarAd(parsedId, state, status, parsedPrice, manufacturer, model, body_type, img_url) {
		const createdOn = new Date();
		const sql = 'INSERT INTO cars (owner, created_on, state, status, price, manufacturer, model, body_type, img_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
		const params = [parsedId, createdOn, state, status, parsedPrice, manufacturer, model, body_type, img_url];
		try {
			return await pool.query(sql, params);
		} catch (error) {
			throw error;
		}
	}
	static async deleteCarAd(parsedCarId) {
		const sql = 'DELETE FROM cars WHERE id=$1';
		const param = [parsedCarId];
		try {
			return await pool.query(sql, param);
		} catch (error) {
			throw error;
		}
	}
	static async changeCarAdPrice(parsedPrice, parsedCarId, parsedId) {
		const sql = 'UPDATE cars SET price=$1 WHERE id=$2 AND owner=$3 RETURNING *';
		const params = [parsedPrice, parsedCarId, parsedId];
		try {
			return await pool.query(sql, params);
		} catch (error) {
			throw error;
		}
	}
	static async changeCarAdStatus(parsedCarId, parsedId) {
		const sql = 'UPDATE cars SET status=$1 WHERE id=$2 AND owner=$3 RETURNING *';
		const params = ['sold', parsedCarId, parsedId];
		try {
			return await pool.query(sql, params);
		} catch (error) {
			throw error;
		}
	}
}
export default Cars;
