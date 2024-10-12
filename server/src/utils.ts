import { fileURLToPath } from 'url';
import path from 'path';
import { Db } from 'mongodb';
import { promises as fs } from 'fs';

// This function will return __filename and __dirname
export function getFileInfo() {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	return { __filename, __dirname };
}

export async function populateMockData(db: Db) {
	const users = db.collection('users');
	const groups = db.collection('groups');

	const userDataFile = await fs.readFile('./data/users.json', 'utf-8');
	const userData = JSON.parse(userDataFile);
	await users.insertMany(userData);
	console.log('Inserted test users');

	const groupsDataFile = await fs.readFile('./data/groups.json', 'utf-8');
	const groupsData = JSON.parse(groupsDataFile);
	await groups.insertMany(groupsData);
	console.log('Inserted test groups');
}