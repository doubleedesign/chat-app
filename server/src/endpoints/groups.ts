import express from 'express';
const router = express.Router();
import usersFile from '../data/users.json' assert { type: 'json' };
import groupsFile from '../data/groups.json' assert { type: 'json' };
import { writeFileSync } from 'fs';

/**
 * GET /groups
 * @tags Groups
 * @summary Get a given user's groups
 * @param {string} userId.query.required - The user's email
 * @return {object} 200 - success response
 */
router.get('/groups', (req, res) => {
	const userId = req.query.userId;

	// If no userId, return 400
	if (!userId) {
		return res.status(400).json({
			error: 'userId is required'
		});
	}

	// Find the user
	const usersObject = JSON.parse(JSON.stringify(usersFile));
	const user = usersObject.find(user => user.email === userId);

	// If user not found, return 404
	if (!user) {
		return res.status(404).json({
			error: 'User not found'
		});
	}

	const groupsObject = JSON.parse(JSON.stringify(groupsFile));

	return res.status(200).json(user.groupIds.map(groupId => {
		return groupsObject.find(group => group.id === groupId);
	}));
});


/**
 * GET /groups/:groupId
 * @tags Groups
 * @summary Get the details of a given group
 * @param {string} groupId.path.required - The group's ID
 * @return {object} 200 - success response
 */
router.get('/groups/:groupId', (req, res) => {
	const groupId = req.params.groupId;

	// If no groupId, return 400
	if (!groupId) {
		return res.status(400).json({
			error: 'groupId is required'
		});
	}

	// Find the group
	const groupsObject = JSON.parse(JSON.stringify(groupsFile));
	const group = groupsObject.find(group => group.id === groupId);

	// If group not found, return 404
	if (!group) {
		return res.status(404).json({
			error: 'Group not found'
		});
	}

	return res.status(200).json(group);
});


/**
 * POST /groups
 * @tags Groups
 * @summary Create a new group
 * @param {object} request.body.required - The group to create
 * @return {object} 201 - success response
 */
router.post('/groups', (req, res) => {
	const group = req.body;

	// If no group data passed, return 400
	if (!group) {
		return res.status(400).json({
			error: 'group is required'
		});
	}

	// Add the group
	const groupsObject = JSON.parse(JSON.stringify(groupsFile));
	groupsObject.push(group);

	// Replace the file with the updated object
	writeFileSync('./data/groups.json', JSON.stringify(groupsObject, null, 4));

	return res.status(201).json(group);
});


/**
 * PATCH /groups/:groupId
 * @tags Groups
 * @summary Update a group
 * @param {string} groupId.path.required - The group's ID
 * @param {object} request.body.required - The group data to update
 * @return {object} 200 - success response
 */
router.patch('/groups/:groupId', (req, res) => {
	const group = req.body;

	// If no group data passed, return 400
	if (!group) {
		return res.status(400).json({
			error: 'group details are required'
		});
	}

	// Find the group
	const groupsObject = JSON.parse(JSON.stringify(groupsFile));
	const groupIndex = groupsObject.findIndex(existingGroup => existingGroup.id === group.id);

	// If group not found, return 404
	if (groupIndex === -1) {
		return res.status(404).json({
			error: 'Group not found'
		});
	}

	// Update the group
	groupsObject[groupIndex] = {
		...groupsObject[groupIndex],
		...group
	};

	// Replace the file with the updated object
	writeFileSync('./data/groups.json', JSON.stringify(groupsObject, null, 4));

	return res.status(200).json(groupsObject[groupIndex]);
});

export default router;
