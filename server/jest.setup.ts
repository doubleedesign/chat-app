import { MongoClient } from 'mongodb';
import { promises as fs } from 'fs';
import path from 'path';

const client = new MongoClient('mongodb://localhost:27017');
export const TEST_DATABASE_NAME = 'chatapp-test';

// Before all tests, connect to MongoDB and reset the database
beforeAll(async () => {
	try {
		await client.connect();
		console.log('Connected to MongoDB');
		console.log('Resetting test data');

		const db = client.db(TEST_DATABASE_NAME);
		console.log('Connected to test database');

		const users = db.collection('users');
		const groups = db.collection('groups');

		const userDataFile = await fs.readFile(path.resolve(__dirname, './data/users.json'), 'utf-8');
		const userData = JSON.parse(userDataFile);
		await users.insertMany(userData);
		console.log('Inserted test users');

		const groupsDataFile = await fs.readFile(path.resolve(__dirname, './data/groups.json'), 'utf-8');
		const groupsData = JSON.parse(groupsDataFile);
		await groups.insertMany(groupsData);
		console.log('Inserted test groups');

	}
	catch (error) {
		console.error(error);
		process.exit(1);
	}
});

// After all tests, close the MongoDB connection
afterAll(async () => {
	const db = client.db(TEST_DATABASE_NAME);
	await db.dropDatabase();
	console.log('Dropped test database');

	await client.close();
	console.log('MongoDB connection closed');
});
