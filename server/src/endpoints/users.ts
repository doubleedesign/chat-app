import express from 'express';
const router = express.Router();
import usersFile from '../data/users.json' assert { type: 'json' };
import { writeFileSync } from 'fs';

/**
 * GET /user
 * @tags Users
 * @summary Get a given user's details
 * @param {string} userId.query.required - The user's email
 * @return {object} 200 - success response
 */
router.get('/user', (req, res) => {
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

	return res.status(200).json(user);
});


/**
 * POST /user
 * @tags Users
 * @summary Add a user
 * @param {object} body.user.required - The user details
 * @return {object} 201 - success response
 */
router.post('/user', (req, res) => {
	const user = req.body.user;

	// If no user data passed, return 400
	if (!user) {
		return res.status(400).json({
			error: 'user details are required'
		});
	}

	// If user already exists, return 409
	const usersObject = JSON.parse(JSON.stringify(usersFile));
	if (usersObject.find(u => u.email === user.email)) {
		return res.status(409).json({
			error: 'User already exists'
		});
	}

	usersObject.push(user);

	// Replace the file with the updated object
	writeFileSync('./src/data/users.json', JSON.stringify(usersObject, null, 4));

	return res.status(201).json(user);
});

export default router;
