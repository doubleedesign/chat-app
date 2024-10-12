import app from '../index.ts';
import supertest from 'supertest';
import { DatabaseConnection } from '../datasources/mongodb.ts';
import { TEST_DATABASE_NAME } from '../../jest.setup.ts';
import { generateSingleUser } from '../../utils/test.utils.ts';

/**
 * Ensure the correct database is used throughout the tests
 * This doesn't work in the global mocks file because that runs before the database setup in jest.setup.ts
 */
jest.mock('../constants.ts', () => ({
	__esModule: true,
	getDatabase: jest.fn().mockImplementation(async () => {
		return DatabaseConnection.create(TEST_DATABASE_NAME);
	}),
}));

describe('Users endpoint', () => {

	test('GET /user/:userId', async () => {
		const response = await supertest(app)
			.get('/user/leesa.ward@griffithuni.edu.au');

		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.objectContaining({
			name: 'Leesa Ward',
			email: 'leesa.ward@griffithuni.edu.au',
		}));
	});

	test('GET /user/:userId with no userId', async () => {
		const response = await supertest(app)
			.get('/user');

		expect(response.status).toBe(400);
		expect(response.body).toEqual({
			error: 'User ID is required'
		});
	});

	test('GET /user/:userId with an invalid userId', async () => {
		const response = await supertest(app)
			.get('/user/notauser@example.com');

		expect(response.status).toBe(404);
		expect(response.body.error).toEqual('User not found');
	});

	test('GET /user/:userId/groups', async () => {
		const response = await supertest(app)
			.get('/user/leesa.ward@griffithuni.edu.au/groups');

		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(3);
		expect(response.body).toEqual(expect.arrayContaining([
			expect.objectContaining({
				id: 'rik1lvWY0O2w',
				label: 'Software Developers'
			}),
		]));
	});

	test('GET /user/:userId/groups with invalid userId', async () => {
		const response = await supertest(app)
			.get('/user/notauser@example.com/groups');

		expect(response.status).toBe(404);
	});

	test('POST /user', async () => {
		const user = generateSingleUser();
		const response = await supertest(app)
			.post('/user')
			.send(user);

		expect(response.status).toBe(201);
		expect(response.body).toEqual({
			_id: expect.any(String), // the ID is added by Mongo
			...user,
		});
	});

	test('POST /user when user already exists', async () => {
		const user = {
			name: 'Leesa Ward',
			email: 'leesa.ward@griffithuni.edu.au',
			avatar: '',
			groupIds: []
		};
		const response = await supertest(app)
			.post('/user')
			.send(user);

		expect(response.status).toBe(409);
		expect(response.body.error).toEqual('User already exists');
	});

	test('POST /user with missing fields', async () => {
		const response = await supertest(app)
			.post('/user')
			.send({ name: 'Incomplete user' });

		expect(response.status).toBe(400);
		expect(response.body.error).toEqual('User is missing required fields');
	});
});
    