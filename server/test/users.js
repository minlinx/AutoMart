import { assert } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';
import app from '../app';
import User from '../../api/models/users';

const userEmail = 'minaproblemsolver0987654321@automart.com';
const userPassword = '0708@Automart';
const userData = {
	email: 'minaproblemsolver0987654321@automart.com',
	password: userPassword,
	first_name: 'mba',
	last_name: 'ifeanyi',
	address: 'No. 8 george odugwu street, era, ijanikin, otto-awori, lagos.'
};

describe('***Users Routes***', () => {
	before(async () => {
		const deletedUser = await User.deleteUserData(userEmail);
	});
	after(async () => {
		const deletedUser = await User.deleteUserData(userEmail);
	});
	describe('# Signup Route', () => {
		it('Should return the data of the new user', done => {
			request(app)
				.post('/api/v1/auth/signup')
				.send(userData)
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '201');
					done();
				});
		});
		it('Should return a status code of 422 for an empty field', done => {
			request(app)
				.post('/api/v1/auth/signup')
				.end((error, response) => {
					assert.equal(response.statusCode, '422');
					done();
				});
		});
		it('Should return a status code of 400 for an existing user', done => {
			request(app)
				.post('/api/v1/auth/signup')
				.send(userData)
				.end((error, response) => {
					assert.equal(response.statusCode, '400');
					done();
				});
		});
	});
	describe('# Signin Route', () => {
		it('Should Signin because user is registered', done => {
			request(app)
				.post('/api/v1/auth/signin')
				.send({
					email: userEmail,
					password: userPassword,
				})
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '200');
					done();
				});
		});
		it('Should return a status code of 422 for not supplying required data', done => {
			request(app)
				.post('/api/v1/auth/signin')
				.end((error, response) => {
					assert.equal(response.statusCode, '422');
					done();
				});
		});
		it('Should return a status code of 422 for not supplying required data', done => {
			request(app)
				.post('/api/v1/auth/signin')
				.send({
					email: '',
					password: 'tester',
				})
				.end( async (error, response) => {
					console.log(error);
					assert.equal( await response.statusCode, '422');
					done();
				});
		});
	});
});
