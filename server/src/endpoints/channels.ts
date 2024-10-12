import express from 'express';
const router = express.Router();
import { db } from '../constants.ts';

/**
 * GET /channels
 * @tags Channels
 * @summary Get a given channel's details
 * @param {string} channelId.query.required - The channel's ID
 * @return {object} 200 - success response
 */
router.get('/channels/:channelId', (req, res) => {
	const channelId = req.query.channelId;

	// If no channelId, return 400
	if (!channelId) {
		return res.status(400).json({
			error: 'channelId is required'
		});
	}

	try {
		const channel = db.getChannel(channelId as string);

		return res.status(200).json(channel);
	}
	catch(error) {
		return res.status(404).json({
			error: error.message
		});
	}
});


/**
 * POST /channels
 * @tags Channels
 * @summary Add a channel to a group
 * @param {object} body.channel.required - The channel details
 * @param {string} body.groupId.required - The group's ID
 * @return {object} 201 - success response
 */
router.post('/channels', async (req, res) => {
	const { groupId, channel } = req.body;

	// If no groupId, return 400
	if (!groupId) {
		return res.status(400).json({
			error: 'groupId is required'
		});
	}

	// If no channel data passed, return 400
	if (!channel) {
		return res.status(400).json({
			error: 'channel details are required'
		});
	}

	const updated = await db.createChannel(groupId, channel);

	return res.status(201).json(updated);
});


/**
 * DELETE /channels
 * @tags Channels
 * @summary Remove a channel from the database
 * @param {string} body.channelId.required - The channel's ID
 */
router.delete('/channels', async (req, res) => {
	const { channelId } = req.body;

	// If no channelId, return 400
	if (!channelId) {
		return res.status(400).json({
			error: 'channelId is required'
		});
	}

	const updated = await db.deleteChannel(channelId);

	return res.status(204).json(updated);
});

export default router;
