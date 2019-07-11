import bcrypt from 'bcrypt';
class Bcrypthash {
	static  hashPassword (password) {
		const saltRounds = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, saltRounds);
		return hashedPassword;
	}
	static correctPassword (password, hashedPassword) {
		return bcrypt.compareSync(password, hashedPassword);
	}
}
export default Bcrypthash;
