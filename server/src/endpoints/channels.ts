import express from 'express';
const router = express.Router();
import { getDatabase } from '../constants.ts';


/**
 * GET /channels
 * @tags Channels
 *
 * @return {object} 400 - Error response if no parameters are passed
 */
router.get('/channels', async (req, res) => {
	return res.status(400).json({
		error: 'Channel ID is required'
	});
});


/**
 * GET /channels/:channelId
 * @tags Channels
 * @summary Get a given channel's details
 * @param {string} channelId.param.required - The channel's ID
 *
 * @return {object} 200 - Channel details
 * @return {object} 404 - Channel not found
 */
router.get('/channels/:channelId', async (req, res, next) => {
	const db = await getDatabase();
	const channelId = req.params.channelId;
	// If no channelId is provided, this endpoint won't be hit - it goes to /channels

	try {
		const channel = await db.getChannel(channelId as string);

		return res.status(200).json(channel);
	}
	catch (error) {
		return res.status(404).json({
			error: error.message
		});
	}
});


/**
 * POST /channels
 * @tags Channels
 * @summary Add a channel to a group
 * @param {object} body.request.required - The channel details and group ID
 *
 * @return {Channel} 201 - Created Channel
 * @return {object} 409 - Conflict (channel already exists)
 * @return {object} 400 - Bad request
 */
router.post('/channels', async (req, res) => {
	const db = await getDatabase();
	const { groupId, channel } = req.body;

	// If no groupId, return 400
	if (!groupId) {
		return res.status(400).json({
			error: 'Group ID is required'
		});
	}

	// If no channel data passed, return 400
	if (!channel) {
		return res.status(400).json({
			error: 'Channel details are required'
		});
	}

	try {
		const updated = await db.createChannel(groupId, channel);

		return res.status(201).json(updated);
	}
	catch (error) {
		if(error.message === 'Channel already exists') {
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
 * DELETE /channels
 * @tags Channels
 *
 * @return {object} 400 - Error response if no parameters are passed
 */
router.delete('/channels', async (req, res) => {
	return res.status(400).json({
		error: 'Channel ID is required'
	});
});


/**
 * DELETE /channels/:channelId
 * @tags Channels
 * @summary Remove a channel from the database
 * @param {string} channelId.param.required - The channel's ID
 *
 * @return {object} 204 - Updated Group
 * @return {object} 400 - Bad request
 */
router.delete('/channels/:channelId', async (req, res) => {
	const db = await getDatabase();
	const { channelId } = req.params;

	try {
		const updated = await db.deleteChannel(channelId);

		return res.status(204).json(updated);
	}
	catch (error) {
		if(error.message === 'Channel not found') {
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
