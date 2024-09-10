import usersFile from './data/users.json' assert { type: 'json' };
import groupsFile from './data/groups.json' assert { type: 'json' };
import { Group, User, UserId } from './types.ts';
import { writeFileSync } from 'fs';

/**
 * Get the details of the groups a user belongs to from the JSON file
 * @param userId
 *
 * @return {User} The user's details
 */
export function getUser(userId: UserId): User {
	const usersObject = JSON.parse(JSON.stringify(usersFile));
	const user = usersObject.find((user: User) => user.email === userId);

	if(!user) {
		throw new Error('User not found');
	}

	return user;
}


/**
 * Create a new user by adding them to the JSON file
 * @param user
 *
 * @return {User} - The newly created user
 */
export function createUser(user: User): User {
	const userExists = getUser(user.email);
	if(userExists) {
		throw new Error('User already exists');
	}

	try {
		const usersObject = JSON.parse(JSON.stringify(usersFile));
		usersObject.push(user);

		// Replace the file with updated data
		writeFileSync('./src/data/users.json', JSON.stringify(usersObject, null, 4));

		// Return the user, fetched from the file to make sure they were actually added
		return getUser(user.email) as User;
	}
	catch(error) {
		throw new Error(error);
	}
}


/**
 * Get the details of the groups a user belongs to from the JSON file
 * @param userId
 *
 * @return {Group[]} The groups the user belongs to
 */
export function getGroupsForUser(userId: UserId): Group[] {
	const groupsObject = JSON.parse(JSON.stringify(groupsFile));
	const user = getUser(userId);

	return user.groupIds.map(groupId => groupsObject.find((group: Group) => group.id === groupId));
}


/**
 * Get the details of a group from the JSON file
 * @param groupId - the ID of the group to look up
 *
 * @return {Group} The group details
 */
export function getGroup(groupId: string): Group | undefined {
	const groupsObject = JSON.parse(JSON.stringify(groupsFile));

	return groupsObject.find((group: Group) => group.id === groupId);
}


/**
 * Create a new group by adding it to the JSON file
 * @param group
 *
 * @return {void}
 */
export function createGroup(group: Group): Group {
	const groupsObject = JSON.parse(JSON.stringify(groupsFile));
	groupsObject.push(group);

	// Replace the file with updated data
	writeFileSync('./src/data/groups.json', JSON.stringify(groupsObject, null, 4));

	// Return the group, fetched from the file to make sure it was actually added
	return getGroup(group.id) as Group;
}


/**
 * Update a group's details in the JSON file (e.g., adding admins)
 * @param group - Updated group data
 *
 * @return {void}
 */
export function updateGroup(group: Group): Group {
	// Find the group
	const groupsObject = JSON.parse(JSON.stringify(groupsFile));
	const groupIndex = groupsObject.findIndex((g: Group) => g.id === group.id);

	if (groupIndex === -1) {
		throw new Error('Group not found');
	}

	groupsObject[groupIndex] = group;

	// Replace the file with updated data
	writeFileSync('./src/data/groups.json', JSON.stringify(groupsObject, null, 4));

	// Return the group, fetched again to make sure it was actually updated
	return getGroup(group.id) as Group;
}
