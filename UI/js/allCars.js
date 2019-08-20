import CarAd from './allUnsoldCars';
const sometning = new CarAd();
const myInit = {
	method: 'GET',
	mode: 'cors',
	cache: 'default',
	headers: {
		'Content-Type': 'application/json',
	},
};
const getAllCars = async () => {
	try {
		const response = await fetch('/api/v1/car', myInit);
		if (response.ok) {
			const serverResponseData = await response.json();
			const { data } = serverResponseData;
			return await sometning(data);
		}
	} catch (error) {
		console.log(error);
	}
};

document.addEventListener('DOMContentLoaded', () => {
	getAllCars();
});
