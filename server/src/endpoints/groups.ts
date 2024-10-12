import express from 'express';
const router = express.Router();
import { UserId } from '../types.ts';
import { getDatabase } from '../constants.ts';

/**
 * GET /groups
 * @tags Groups
 * @summary Get a given user's groups
 * @param {string} userId.query.required - The user's email
 * @return {object} 200 - success response
 */
router.get('/groups', async (req, res) => {
	const db = await getDatabase();
	const userId = req.query.userId;

	// If no userId, return 400
	if (!userId) {
		return res.status(400).json({
			error: 'userId is required'
		});
	}

	try {
		const user = await db.getUser(userId as string);
		const groups = await db.getGroupsForUser(userId as UserId);

		return res.status(200).json(groups);
	}
	catch (error) {
		return res.status(404).json({
			error: error.message
		});
	}

});


/**
 * GET /groups/:groupId
 * @tags Groups
 * @summary Get the details of a given group
 * @param {string} groupId.path.required - The group's ID
 * @return {object} 200 - success response
 */
router.get('/groups/:groupId', async (req, res) => {
	const db = await getDatabase();
	const groupId = req.params.groupId;
	// If no groupId, this endpoint won't be hit - it goes to /groups

	try {
		const group = await db.getGroup(groupId as string);

		return res.status(200).json(group);
	}
	catch (error) {
		return res.status(404).json({
			error: error.message
		});
	}
});


/**
 * POST /groups
 * @tags Groups
 * @summary Create a new group
 * @param {object} request.body.required - The group to create
 * @return {object} 201 - success response
 */
router.post('/groups', async (req, res) => {
	const db = await getDatabase();
	const group = req.body;

	try {
		const newGroup = await db.createGroup(group);

		return res.status(201).json(newGroup);
	}
	catch (error) {
		if (error.message === 'Group already exists') {
			return res.status(409).json({
				error: error.message
			});
		}

		return res.status(400).json({
			error: error.message
		});
	}
});


/**
 * PATCH /groups/:groupId
 * @tags Groups
 * @summary Update a group
 * @param {string} groupId.path.required - The group's ID
 * @param {object} request.body.required - The group data to update
 * @return {object} 200 - success response
 */
router.patch('/groups', async (req, res) => {
	const db = await getDatabase();
	const group = req.body;

	try {
		const updated = await db.updateGroup(group);

		return res.status(201).json(updated);
	}
	catch (error) {
		if(error.message === 'Group not found') {
			return res.status(404).json({
				error: error.message
			});
		}

		return res.status(400).json({
			error: error.message
		});
	}
});


export default router;
