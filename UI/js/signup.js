const signUpForm = document.querySelector('.page-body-signup-form');
const signUp = async (event) => {
	const formData = new FormData(signUpForm);
	const data = new URLSearchParams(formData);
	const myInit = {
		method: 'POST',
		mode: 'cors',
		cache: 'default',
		body: data
	};
	event.preventDefault();
	try {
		const response = await fetch('/api/v1/auth/signup', myInit);
		if (response.ok) {
			let serverResponseData = await response.json();
			console.log(serverResponseData);
		}
		else {
			let serverResponseData = await response.json();
			console.log(serverResponseData);
		}
	} catch (error) {
		console.log(error);
	}
};
document.addEventListener('DOMContentLoaded', () => {
	signUpForm.addEventListener('submit', (e) => signUp(e));
});
