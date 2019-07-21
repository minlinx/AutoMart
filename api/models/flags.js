import pool from '../../dbConifg';
class Flags {
	static async postFlag(parsedCarId, reason, description) {
		const createdOn = new Date();
		const sql = 'INSERT INTO flags(car_id, created_on, reason, description) VALUES ($1, $2, $3, $4) RETURNING *';
		const params = [parsedCarId, createdOn, reason, description];
		try {
			return await pool.query(sql, params);
		} catch (error) {
			throw error;
		}
	}
}
export default Flags;
