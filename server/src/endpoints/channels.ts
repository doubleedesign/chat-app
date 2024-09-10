import express from 'express';
const router = express.Router();
import groupsFile from '../data/groups.json' assert { type: 'json' };
import { writeFileSync } from 'fs';

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

	// Find the channel
	const groupsObject = JSON.parse(JSON.stringify(groupsFile));
	const channel = groupsObject.find(group => group.channels.find(channel => channel.id === channelId));

	// If channel not found, return 404
	if (!channel) {
		return res.status(404).json({
			error: 'Channel not found'
		});
	}

	return res.status(200).json(channel);
});


/**
 * POST /channels
 * @tags Channels
 * @summary Add a channel to a group
 * @param {object} body.channel.required - The channel details
 * @param {string} body.groupId.required - The group's ID
 * @return {object} 201 - success response
 */
router.post('/channels', (req, res) => {
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

	// Find the group
	const groupsObject = JSON.parse(JSON.stringify(groupsFile));
	const group = groupsObject.find(group => group.id === groupId);

	// If group not found, return 404
	if (!group) {
		return res.status(404).json({
			error: 'Group not found'
		});
	}

	// Add the channel
	groupsObject.channels.push(channel);

	// Replace the file with the updated object
	writeFileSync('./data/groups.json', JSON.stringify(groupsObject, null, 4));

	return res.status(201).json(group);
});


/**
 * DELETE /channels
 * @tags Channels
 * @summary Remove a channel from the database
 * @param {string} body.channelId.required - The channel's ID
 */
router.delete('/channels', (req, res) => {
	const { channelId } = req.body;

	// If no channelId, return 400
	if (!channelId) {
		return res.status(400).json({
			error: 'channelId is required'
		});
	}

	// Find the channel
	const groupsObject = JSON.parse(JSON.stringify(groupsFile));
	const group = groupsObject.find(group => group.channels.find(channel => channel.id === channelId));
	const channelIndex = group.channels.findIndex(channel => channel.id === channelId);

	// Remove the channel
	group.channels.splice(channelIndex, 1);

	// Replace the file with the updated object
	writeFileSync('./data/groups.json', JSON.stringify(groupsObject, null, 4));

	return res.status(200).json(group);
});

export default router;
