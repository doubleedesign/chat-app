import app from '../index.ts';
import supertest from 'supertest';
import { DatabaseConnection } from '../datasources/mongodb.ts';
import { TEST_DATABASE_NAME } from '../../jest.setup.ts';
import { generateSingleGroup } from '../../utils/test.utils.ts';

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

describe('Groups endpoint', () => {

	test('GET /groups with no parameters', async () => {
		const response = await supertest(app)
			.get('/groups');

		expect(response.status).toBe(400);
	});

	test('GET /groups', async () => {
		const response = await supertest(app)
			.get('/groups')
			.query({ userId: 'leesa.ward@griffithuni.edu.au' });

		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(3);
		expect(response.body).toEqual(expect.arrayContaining([
			expect.objectContaining({
				id: 'rik1lvWY0O2w',
				label: 'Software Developers'
			}),
		]));
	});

	test('GET /groups with invalid userId', async () => {
		const response = await supertest(app)
			.get('/groups')
			.query({ userId: 'notauser@example.com' });

		expect(response.status).toBe(404);
	});

	test('GET /groups/:groupId', async () => {
		const response = await supertest(app)
			.get('/groups/OhcewGKdqzKS');

		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.objectContaining({
			id: 'OhcewGKdqzKS',
			label: 'Computer Graphics Specialists'
		}));

	});

	test('GET /groups/:groupId with an invalid groupId', async () => {
		const response = await supertest(app)
			.get('/groups/abc');

		expect(response.status).toBe(404);
	});

	test('POST /groups', async () => {
		const group = generateSingleGroup();
		const response = await supertest(app)
			.post('/groups')
			.send(group);

		expect(response.status).toBe(201);
		expect(response.body).toEqual({
			_id: expect.any(String), // the ID is added by Mongo
			...group,
		});
	});

	test('POST /groups when group already exists', async () => {
		const group = {
			id: 'OhcewGKdqzKS',
			label: 'Computer Graphics Specialists',
			avatar: '',
			admins: [],
			channels: []
		};
		const response = await supertest(app)
			.post('/groups')
			.send(group);

		expect(response.status).toBe(409);
		expect(response.body).toEqual({
			error: 'Group already exists'
		});
	});

	test('POST /groups with no group data', async () => {
		const response = await supertest(app)
			.post('/groups');

		expect(response.status).toBe(400);
		expect(response.body.error).toEqual('Group is missing required fields');
	});

	test('POST /groups with missing fields', async () => {
		const response = await supertest(app)
			.post('/groups')
			.send({ name: 'Incomplete group' });

		expect(response.status).toBe(400);
		expect(response.body.error).toEqual('Group is missing required fields');
	});

	test('PATCH /groups', async () => {
		const response = await supertest(app)
			.patch('/groups')
			.send({
				id: 'OhcewGKdqzKS',
				label: 'Updated Group',
				channels: [],
				admins: []
			});

		expect(response.status).toBe(201);
		expect(response.body).toEqual(expect.objectContaining({
			id: 'OhcewGKdqzKS',
			label: 'Updated Group'
		}));
	});

	test('PATCH /groups with no group data', async () => {
		const response = await supertest(app)
			.patch('/groups');

		expect(response.status).toBe(404);
		expect(response.body.error).toEqual('Group not found');
	});

	test('PATCH /groups with invalid group ID', async () => {
		const response = await supertest(app)
			.patch('/groups')
			.send({
				id: 'abc',
				label: 'Updated Group'
			});

		expect(response.status).toBe(404);
		expect(response.body.error).toEqual('Group not found');
	});

	test('PATCH /groups with missing fields', async () => {
		const response = await supertest(app)
			.patch('/groups')
			.send({ id: 'OhcewGKdqzKS' });

		expect(response.status).toBe(400);
		expect(response.body.error).toEqual('Group is missing required fields');
	});
});
