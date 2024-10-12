import express from 'express';
const router = express.Router();
import { UserId } from '../types.ts';
import { getDatabase } from '../constants.ts';


/**
 * GET /groups
 * @tags Groups
 *
 * @return {object} 400 - Error response if no parameters are passed
 */
router.get('/groups', async (req, res) => {
	return res.status(400).json({
		error: 'User or group ID is required'
	});
});


/**
 * GET /groups/:groupId
 * @tags Groups
 * @summary Get the details of a given group
 * @param {string} groupId.param.required - The group's ID
 *
 * @return {Group} 200 - Group
 * @return {object} 404 - Group not found
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
 * @param {Group} body.group.required - The group to create
 *
 * @return {Group} 201 - Created Group
 * @return {object} 409 - Conflict (group already exists)
 * @return {object} 400 - Bad request
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
 * @param {string} groupId.param.required - The group's ID
 * @param {Group} body.group.required - The group data to update
 *
 * @return {Group} 201 - Updated Group
 * @return {object} 404 - Group not found
 * @return {object} 400 - Bad request
 */
router.patch('/groups/:groupId', async (req, res) => {
	const db = await getDatabase();
	const groupId = req.params.groupId;
	const group = req.body;

	try {
		const updated = await db.updateGroup(groupId, group);

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
