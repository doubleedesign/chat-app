/**
 * Script to generate mock data for Phase 1
 * Uses the following utility libraries for efficiency:
 * Short Unique ID (https://www.npmjs.com/package/short-unique-id) to generate IDs
 * Chance.js (https://chancejs.com) and https://www.npmjs.com/package/gfynonce to generate random user/group/channel names
 * English Inflectors (https://www.npmjs.com/package/en-inflectors) to pluralise generated phrases
 * Case (https://www.npmjs.com/package/case) to convert names to different cases
 * Lodash (https://lodash.com) to select random items from an array
 */
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { Group, User } from '../src/types';
import ShortUniqueId from 'short-unique-id';
import Case from 'case';
import sampleSize from 'lodash/sampleSize';
import random from 'lodash/random';
import Chance from 'chance';
import { generateRandomChannelName, generateRandomGroupName } from './test.utils.ts';

const chance = new Chance();

generate();

function generate() {
	const users = generateUsers(30);
	const groups = generateGroups(12, users);
	addUsersToGroups(users, groups);

	// Get the current directory of the ES module
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	// Where to put the files
	const usersFilePath = path.resolve(__dirname, '../src/data/users.json');
	const groupsFilePath = path.resolve(__dirname, '../src/data/groups.json');
	const dataDirectory = path.resolve(__dirname, '../src/data');

	// Create the directory if it doesn't exist
	if (!existsSync(dataDirectory)) {
		mkdirSync(dataDirectory, { recursive: true });
	}

	// Write the files
	writeFileSync(usersFilePath, JSON.stringify(users, null, 4));
	writeFileSync(groupsFilePath, JSON.stringify(groups, null, 4));
}


function generateUsers(qty: number): User[] {
	const emailDomains = ['gmail.com', 'outlook.com', 'example.com', 'hotmail.com'];

	return Array.from({ length: qty }, () => {
		const name = chance.name({ nationality: 'en' });

		return ({
			name,
			email: `${Case.snake(name)}@${sampleSize(emailDomains, 1)}`,
			avatar: chance.avatar({ protocol: 'https' }),
			groupIds: []
		});
	});
}

function generateGroups(qty: number, users: User[]) {
	const uid = new ShortUniqueId({ length: 12 });

	return Array.from({ length: qty }, () => {
		const id = uid.rnd();
		const admins = sampleSize(users, random(1, 5)).map(user => user.email);

		// Put the admin users in the group
		admins.forEach(admin => {
			const user = users.find(user => user.email === admin);
			if (user) {
				user.groupIds.push(id);
			}
		});

		// Generate the group details
		return {
			id,
			label: generateRandomGroupName(),
			avatar: chance.avatar({ protocol: 'https' }),
			admins: admins,
			channels: generateChannels(random(0, 8))
		};
	});
}

function generateChannels(qty: number) {
	const uid = new ShortUniqueId({ length: 16 });

	return Array.from({ length: qty }, () => {
		return {
			id: uid.rnd(),
			label: generateRandomChannelName(),
			avatar: chance.avatar({ protocol: 'https' }),
		};
	});
}

function addUsersToGroups(users: User[], groups: Group[]) {
	users.forEach(user => {
		const randomGroups = sampleSize(groups, random(1, 5));
		user.groupIds.concat(randomGroups.map(group => group.id));
	});
}