import express from 'express';
const router = express.Router();
import { UserId } from '../types.ts';
import { db } from '../constants.ts';

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
	const user = db.getUser(userId as string);

	// If user not found, return 404
	if (!user) {
		return res.status(404).json({
			error: 'User not found'
		});
	}

	const groups = db.getGroupsForUser(userId as UserId);

	return res.status(200).json(groups);
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

	return db.getGroup(groupId);
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

	const newGroup = db.createGroup(group);

	return res.status(201).json(newGroup);
});


/**
 * PATCH /groups/:groupId
 * @tags Groups
 * @summary Update a group
 * @param {string} groupId.path.required - The group's ID
 * @param {object} request.body.required - The group data to update
 * @return {object} 200 - success response
 */
router.patch('/groups', (req, res) => {
	const group = req.body;

	// If no group data passed, return 400
	if (!group) {
		return res.status(400).json({
			error: 'group details are required'
		});
	}

	try {
		const updated = db.updateGroup(group);

		return res.status(201).json(updated);
	}
	catch (error) {
		return res.status(400).json({
			error: error.message
		});
	}
});


export default router;
