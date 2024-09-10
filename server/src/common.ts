import { Group, User, UserId } from './types.ts';
import { writeFileSync, readFileSync } from 'fs';

/**
 * Retrieve the details of the groups a user belongs to from the JSON file
 * @param userId
 *
 * @return {User} The user's details
 */
export function getUser(userId: UserId): User {
	const usersFile = readFileSync('./src/data/users.json', 'utf-8'); // Read as string
	const usersObject = JSON.parse(usersFile);
	const user = usersObject.find((user: User) => user.email === userId);

	if(!user) {
		throw new Error('User not found');
	}

	return user;
}


/**
 * Create a new user by adding them to the JSON file
 * @param newUser - The new user to add
 *
 * @return {User} - The newly created user
 */
export function createUser(newUser: User): User {
	const usersFile = readFileSync('./src/data/users.json', 'utf-8'); // Read as string
	const usersObject = JSON.parse(usersFile);
	const userExists = usersObject.find((user: User) => user.email === newUser.email);
	if(userExists) {
		throw new Error('User already exists');
	}

	try {
		const usersObject = JSON.parse(usersFile);
		usersObject.push(newUser);

		// Replace the file with updated data
		writeFileSync('./src/data/users.json', JSON.stringify(usersObject, null, 4));

		// Return the user, fetched from the file to make sure they were actually added
		return getUser(newUser.email) as User;
	}
	catch(error) {
		throw new Error(error);
	}
}


/**
 * Retrieve details of the groups a user belongs to from the JSON file
 * @param userId
 *
 * @return {Group[]} The groups the user belongs to
 */
export function getGroupsForUser(userId: UserId): Group[] {
	const groupsFile = readFileSync('./src/data/groups.json', 'utf-8'); // Read as string
	const groupsObject = JSON.parse(groupsFile);
	const user = getUser(userId);

	return user.groupIds.map(groupId => groupsObject.find((group: Group) => group.id === groupId));
}


/**
 * Retrieve the details of a group from the JSON file
 * @param groupId - the ID of the group to look up
 *
 * @return {Group} The group details
 */
export function getGroup(groupId: string): Group | undefined {
	const groupsFile = readFileSync('./src/data/groups.json', 'utf-8'); // Read as string
	const groupsObject = JSON.parse(groupsFile);

	return groupsObject.find((group: Group) => group.id === groupId);
}


/**
 * Create a new group by adding it to the JSON file
 * @param group
 *
 * @return {void}
 */
export function createGroup(group: Group): Group {
	const groupsFile = readFileSync('./src/data/groups.json', 'utf-8'); // Read as string
	const groupsObject = JSON.parse(groupsFile);
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
	const groupsFile = readFileSync('./src/data/groups.json', 'utf-8'); // Read as string
	const groupsObject = JSON.parse(groupsFile);
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
