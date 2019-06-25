const createDivElementWithClassName = (className) => {
	let div = document.createElement('div');
	div.setAttribute('class', className);
	return div;
};
const myInit = {
	method: 'GET',
	mode: 'cors',
	cache: 'default',
	headers: {
		'Content-Type': 'application/json',
	},
};
const getAllUnsoldCars = async () => {
	try {
		const response = await fetch('/api/v1/car?status=available&state=new', myInit);
		if (response.ok) {
			const serverResponseData = await response.json();
			const { data } = serverResponseData;
			data.forEach(car => {
				const { car_image, manufacturer, price, state } = car;
				const img = document.createElement('img');
				const span = document.createElement('span');
				const strong = document.createElement('strong');
				let divallUnsoldCarsMainView = createDivElementWithClassName('all-unsold-cars-main-view');
				let divCarAd = createDivElementWithClassName('car-ad');
				let divCarAdImage = createDivElementWithClassName('car-ad-image');
				let divCarAdDescription = createDivElementWithClassName('car-ad-description');
				let divCarAdPrice = createDivElementWithClassName('car-ad-price');
				let divCarAdBrand = createDivElementWithClassName('car-ad-brand');
				let divCarAdState = createDivElementWithClassName('car-ad-state');
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
			});
		}
	} catch (error) {
		const response1 = await fetch('/api/v1/car');
		if (response1.ok) {
			const serverResponseData1 = await response1.json();
			const { data } = serverResponseData1;
			console.log(data);
		}
		console.log(error);
	}
};

document.addEventListener('DOMContentLoaded', () => {
	getAllUnsoldCars();
});