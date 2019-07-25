import Bcrypt from '../middlewares/bcryptHash';
const img_url = 'https://res.cloudinary.com/min-automart/image/upload/v1563690211/min-automart-images/1563690206045g7.jpg.jpg';
const car = [
	1,
	'2019-06-25',
	'new',
	'available',
	250000,
	'bmw',
	'bmw-12202',
	'van',
	img_url
];
const car1 = [
	1,
	'2019-06-25',
	'used',
	'available',
	250000,
	'bmw',
	'bmw-12202',
	'van',
	img_url
];
const car2 = [
	1,
	'2019-06-25',
	'new',
	'available',
	9000000,
	'bmw',
	'bmw-12202',
	'van',
	img_url
];
const car3 = [
	1,
	'2019-06-25',
	'used',
	'available',
	250000,
	'bmw',
	'bmw-12202',
	'van',
	img_url
];

const order = [
	1,
	60,
	45000000,
	'pending',
	'2019-06-25'
];

const flag = [
	60,
	'2019-06-25',
	'very expensive',
	'compared and found price is very expensive'
];

const user1 = [
	'minaproblemsolver0987654321@automart.com',
	Bcrypt.hashPassword('0708@Automart'),
	'mba',
	'ifeanyi',
	'No. 8 macauly street, era, ijanikin, otto-awori, lagos',
	true,
];

const user2 = [
	'minaproblemsolver0987654321@gmail.com',
	Bcrypt.hashPassword('0708@Automart'),
	'mba',
	'benjamin',
	'No. 8 macauly street, era, ijanikin, otto-awori, lagos',
	false,
];
export default { car, car1, car2, car3, order, flag, user1, user2 };
