class CarAd {
	constructor(data) {
		data.forEach(car => {
			const { car_image, manufacturer, price, state } = car;
			const img = document.createElement('img');
			// const link = document.createElement('a');
			const span = document.createElement('span');
			const strong = document.createElement('strong');
			let divallUnsoldCarsMainView = this.createDivElementWithClassName('all-unsold-cars-main-view');
			let divCarAd = this.createDivElementWithClassName('car-ad');
			let divCarAdImage = this.createDivElementWithClassName('car-ad-image');
			let divCarAdDescription = this.createDivElementWithClassName('car-ad-description');
			let divCarAdPrice = this.createDivElementWithClassName('car-ad-price');
			let divCarAdBrand = this.createDivElementWithClassName('car-ad-brand');
			let divCarAdState = this.createDivElementWithClassName('car-ad-state');
			divCarAdState.appendChild(strong);
			divCarAdImage.appendChild(img);
			divCarAdState.appendChild(span);
			divCarAdPrice.appendChild(strong);
			divCarAdBrand.appendChild(span);
			divCarAdDescription.appendChild(divCarAdState);
			divCarAdDescription.appendChild(divCarAdPrice);
			divCarAdDescription.appendChild(divCarAdBrand);
			divCarAd.appendChild(divCarAdImage);
			divCarAd.appendChild(divCarAdDescription);
			// link.appendChild(divCarAd);
			const arr = new Array(76666, 9809, 6, 87, 908877, 87665, 76543, 5555, 76890, 321111, 54321, 89000);
			const som = arr.forEach((number) => {
				const v1 = 888888;
				return this.createDivElementWithClassName('car-something') + v1 + number;
			});
			divallUnsoldCarsMainView.appendChild(divCarAd);
			divCarAdImage.firstChild.setAttribute('src', car_image);
			divCarAdState.innerHTML = state;
			divCarAdPrice.firstChild.innerHTML = price;
			divCarAdBrand.firstChild.innerHTML = manufacturer;
			divCarAdBrand.firstChild.style.display = 'block';
			let div1 = document.querySelector('.all-unsold-cars-main-view');
			div1.appendChild(divCarAd);
			console.log(divCarAdState);
			console.log(divCarAdPrice);
			console.log(divCarAdBrand);
			console.log(divCarAdImage);
			console.log(car);
			console.log(som);
		});
	}
	createDivElementWithClassName(className)  {
		let div = document.createElement('div');
		div.setAttribute('class', className);
		return div;
	}
}
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsImVtYWlsIjoibWJhbmVsc29uaWZlYW55aUBnbWFpbC5jb20iLCJpYXQiOjE1NjQ0NzA4OTUsImV4cCI6MTU2NDU1NzI5NX0.oGaqVn36lhfAiDoiKzuOewu4EjB8fBlOi-ZcmzkvPPM';
const myInit = {
	method: 'GET',
	mode: 'cors',
	cache: 'default',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `bearer ${ token }`
	},
};
class GetDataFromDatabase {
	static async getAllUnsoldCars(url) {
		try {
			const response = await fetch(url, myInit);
			// const response = await fetch('http://localhost:3000/api/v1/car?status=available&state=new', myInit);
			if (response.ok) {
				const serverResponseData = await response.json();
				const { data } = serverResponseData;
				return new CarAd(data);
			}
		} catch (error) {
			console.log(error);
		}
	}
}
document.addEventListener('DOMContentLoaded', (event) => {
	return GetDataFromDatabase.getAllUnsoldCars(event.target.value);
});
export default CarAd;
