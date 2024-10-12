import express from 'express';
const router = express.Router();
import { getDatabase } from '../constants.ts';

/**
 * GET /user
 * @tags Users
 * @summary Get a given user's details
 * @param {string} userId.query.required - The user's email
 *
 * @return {object} 200 - success response
 */
router.get('/user', async (req, res) => {
	// Get around top-level await errors in tests by defining the db inside the functions
	const db = await getDatabase();

	const userId = req.query.userId;
	// If no userId passed, return 400
	if (!userId) {
		return res.status(400).json({
			error: 'User ID is required'
		});
	}
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
 * POST /user
 * @tags Users
 * @summary Add a user
 * @param {object} body.user.required - The user details
 *
 * @return {object} 201 - success response
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
