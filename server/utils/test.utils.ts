/**
 * General utilities for generating test data
 * Based on the generate.ts script functions used for phase 1, but separated out for clarity
 * (with some functions moved to this file if they're used for both)
 */
import { User } from '../src/types.ts';
import Case from 'case';
import sampleSize from 'lodash/sampleSize';
import { Inflectors } from 'en-inflectors';
import Chance from 'chance';
import gfynonce from 'gfynonce';
import ShortUniqueId from 'short-unique-id';

const chance = new Chance();

export function generateSingleUser(): User {
	const emailDomains = ['gmail.com', 'outlook.com', 'example.com', 'hotmail.com'];
	const name = chance.name({ nationality: 'en' });

	return {
		name,
		email: `${Case.snake(name)}@${sampleSize(emailDomains, 1)}`,
		avatar: chance.avatar({ protocol: 'https' }),
		groupIds: []
	};
}

export function generateSingleGroup() {
	const uid = new ShortUniqueId({ length: 12 });

	return {
		id: uid.rnd(),
		label: generateRandomGroupName(),
		avatar: chance.avatar({ protocol: 'https' }),
		admins: ['henrietta_reed@hotmail.com', 'sadie_harrington@example.com'],
		channels: []
	};
}

/**
 * Generate random-ish group names for the mock data
 */
export function generateRandomGroupName() {
	let name = chance.profession();
	const words = name.split(' ');
	const lastWord = words[words.length - 1];

	return Case.title(
		name.replace(lastWord, new Inflectors(lastWord).toPlural())
	);
}

/**
 * Generate random-ish channel names for the mock data
 */
export function generateRandomChannelName() {
	const phrase = new Inflectors(
		gfynonce({ adjectives: 2, separator: '_' })
	).toPlural();

	return Case.sentence(phrase);
}
