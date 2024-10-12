import express from 'express';
const router = express.Router();
import { getDatabase } from '../constants.ts';
import { UserId } from '../types.ts';

/**
 * GET /user
 * @tags Users
 *
 * @return {object} 400 - Error response if no parameters are passed
 */
router.get('/user', async (req, res) => {
	return res.status(400).json({
		error: 'User ID is required'
	});
});


/**
 * GET /user/:userId
 * @tags Users
 * @summary Get a given user's details
 * @param {string} userId.param.required - The user's email
 *
 * @return {User} 200 - User details
 * @return {object} 404 - User not found
 * @return {object} 400 - Bad request
 */
router.get('/user/:userId', async (req, res) => {
	// Get around top-level await errors in tests by defining the db inside the functions
	const db = await getDatabase();
	const userId = req.params.userId;

	try {
		const user = await db.getUser(userId as string);

		return res.status(200).json(user);
	}
	catch (error) {
		return res.status(404).json({
			error: error.message
		});
	}
});


/**
 * GET /user/:userId/groups
 * @tags Users
 * @summary Get a given user's groups
 * @param {string} userId.param.required - The user's email
 *
 * @return {Group[]} 200 - Group[]
 * @return {object} 404 - User not found
 * @return {object} 400 - Bad request
 */
router.get('/user/:userId/groups', async (req, res) => {
	const db = await getDatabase();
	const userId = req.params.userId;

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
 * POST /user
 * @tags Users
 * @summary Add a user
 * @param {User} body.user.required - The user details
 *
 * @return {User} 201 - Created User
 * @return {object} 409 - Conflict (user already exists)
 * @return {object} 400 - Bad request
 */
router.post('/user', async (req, res) => {
	const db = await getDatabase();
	const newUser = req.body;

	try {
		const user = await db.createUser(newUser);

		return res.status(201).json(user);
	}
	catch (error) {
		if (error.message === 'User already exists') {
			return res.status(409).json({
				error: error.message
			});
		}

		return res.status(400).json({
			error: error.message
		});
	}
});

export default router;
