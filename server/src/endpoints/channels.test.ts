import app from '../index.ts';
import supertest from 'supertest';
import { DatabaseConnection } from '../datasources/mongodb.ts';
import { TEST_DATABASE_NAME } from '../../jest.setup.ts';

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

describe('Channels endpoint', () => {

	test('GET /channels with no parameters', async () => {
		const response = await supertest(app)
			.get('/channels');

		expect(response.status).toBe(400);
		expect(response.body.error).toEqual('Channel ID is required');
	});

	test('GET /channels/:channelId', async () => {
		const response = await supertest(app)
			.get('/channels/rPngshHubLyXZz5B');

		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.objectContaining({
			id: 'rPngshHubLyXZz5B',
			label: 'Mediocre specific irishterriers'
		}));
	});

	test('GET /channels/:channelId with an invalid channelId', async () => {
		const response = await supertest(app)
			.get('/channels/abc');

		expect(response.status).toBe(404);
		expect(response.body.error).toEqual('Channel not found');
	});

	test('POST /channels', async () => {
		const response = await supertest(app)
			.post('/channels')
			.send({
				groupId: 'OhcewGKdqzKS',
				channel: {
					id: 'testChannelId',
					label: 'New Channel',
				}
			});

		expect(response.status).toBe(201);
		expect(response.body).toEqual(expect.objectContaining({
			channels: expect.arrayContaining([{
				id: 'testChannelId',
				label: 'New Channel',
			}])
		}));
	});

	test('POST /channels when a channel by that name already exists', async () => {
		const response = await supertest(app)
			.post('/channels')
			.send({
				groupId: 'Ef8JuR1wdy7I',
				channel: {
					id: 'testChannelId',
					label: 'Rapid delightful bushsqueakers',
				}
			});

		expect(response.status).toBe(409);
	});

	test('POST /channels with no groupId', async () => {
		const response = await supertest(app)
			.post('/channels')
			.send({
				channel: {
					id: 'testChannelId',
					label: 'New Channel',
				}
			});

		expect(response.status).toBe(400);
		expect(response.body.error).toEqual('Group ID is required');
	});

	test('POST /channels with an invalid groupId', async () => {
		const response = await supertest(app)
			.post('/channels')
			.send({
				groupId: 'abc',
				channel: {
					id: 'testChannelId',
					label: 'Another new channel',
				}
			});

		expect(response.status).toBe(400);
		expect(response.body.error).toEqual('Error: Group not found');
	});

	test('POST /channels with no channel data', async () => {
		const response = await supertest(app)
			.post('/channels')
			.send({
				groupId: 'OhcewGKdqzKS'
			});

		expect(response.status).toBe(400);
		expect(response.body.error).toEqual('Channel details are required');
	});

	test('DELETE /channels', async () => {
		const response = await supertest(app)
			.delete('/channels')
			.send({
				channelId: '0txCi3dsPy1UK4Nj'
			});

		expect(response.status).toBe(204);
	});

	test('DELETE /channels with no channelId', async () => {
		const response = await supertest(app)
			.delete('/channels');

		expect(response.status).toBe(400);
		expect(response.body.error).toEqual('Channel ID is required');
	});

	test('DELETE /channels with an invalid channelId', async () => {
		const response = await supertest(app)
			.delete('/channels')
			.send({
				channelId: 'abc'
			});

		expect(response.status).toBe(400);
		expect(response.body.error).toEqual('Channel not found');
	});
});