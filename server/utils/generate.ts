/**
 * Script to generate mock data for Phase 1
 * Uses the following utility libraries for efficiency:
 * https://www.npmjs.com/package/short-unique-id to generate IDs
 * https://www.npmjs.com/package/name-forge to generate random names
 * https://www.npmjs.com/package/case to convert names to different cases
 * https://www.npmjs.com/package/lodash for miscellaneous collection handling utilities
 */
import { User } from '../src/types';
import sample from 'lodash/sample';
import ShortUniqueId from 'short-unique-id';
import * as Case from 'case';
import { fullName } from 'name-forge/src/index.ts';

generate();

function generate() {
	const users = generateUsers(10);

	console.log(users);
}


function generateUsers(qty: number): User[] {
	const genders = ['F', 'M'];
	const countries = ['GB', 'US', 'IT']; // from those supported by name-forge

	return Array.from({ length: qty }, () => {
		const name = fullName(sample(genders), sample(countries));

		return ({
			name,
			email: `${Case.snake(name)}@example.com`,
			groupIds: []
		});
	});
}

function generateGroups(qty) {
	const uid = new ShortUniqueId({ length: 12 });
}