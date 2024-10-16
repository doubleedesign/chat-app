import { Collection, Db, MongoClient } from 'mongodb';
import { Channel, Group, User, UserId } from '../types.ts';

export class DatabaseConnection {
	client: MongoClient;
	private db: Db;
	private users: Collection<User>;
	private groups: Collection<Group>;

	private constructor(client: MongoClient, db: Db) {
		this.client = client;
		this.db = db;
		this.users = this.db.collection('users');
		this.groups = this.db.collection('groups');
	}

    
	/**
     * Factory method to create a new DatabaseConnection
     * (because the constructor can't be async)
     * @param dbName
     *
     * @return {DatabaseConnection} The new DatabaseConnection
     */
	static async create(dbName: string): Promise<DatabaseConnection> {
		const client = new MongoClient('mongodb://localhost:27017');
		await client.connect();
		const db = client.db(dbName);

		return new DatabaseConnection(client, db);
	}


	/**
     * Retrieve the details of a user by their UserId (email address)
     * @param userId
     *
     * @return {User} The user's details
     */
	async getUser(userId: UserId): Promise<User | null> {
		const result = await this.users.findOne({ email: userId });
		if (!result) {
			throw new Error('User not found');
		}

		return result;
	}


	/**
     * Create a new user
     * @param newUser - The new user to add
     *
     * @return {User} - The newly created user
     */
	async createUser(newUser: User): Promise<User> {
		// Make sure newUser is a valid User object
		if (!newUser.name || !newUser.email || !newUser.groupIds) {
			throw new TypeError('User is missing required fields');
		}

		const userExists = await this.users.findOne({ email: newUser.email });

		if (userExists) {
			throw new Error('User already exists');
		}

		try {
			await this.users.insertOne(newUser);

			// Return the user, fetched from the database to make sure they were actually added
			return await this.getUser(newUser.email) as User;
		}
		catch (error) {
			throw new Error(error);
		}
	}


	/**
     * Retrieve details of the groups a user belongs to
     * @param userId
     *
     * @return {Group[]} The groups the user belongs to
     */
	async getGroupsForUser(userId: UserId): Promise<Group[]> {
		const user = await this.getUser(userId);

		return await this.groups.find({ id: { $in: user.groupIds } }).toArray();
	}


	/**
     * Retrieve the details of a group by its ID
     * @param groupId
     *
     * @return {Group} The group details
     */
	async getGroup(groupId: string): Promise<Group> {
		const result = await this.groups.findOne({ id: groupId });

		if (!result) {
			throw new Error('Group not found');
		}

		return result;
	}


	/**
     * Create a new group
     * @param group
     *
     * @return {Group} The newly created group
     */
	async createGroup(group: Group): Promise<Group> {
		// Make sure group is a valid Group object
		if (!group.id || !group.label || !group.admins || !group.channels) {
			throw new TypeError('Group is missing required fields');
		}

		const groupExists = await this.groups.findOne({ id: group.id });
		if (groupExists) {
			throw new Error('Group already exists');
		}

		try {
			await this.groups.insertOne(group);

			// Return the group, fetched from the database to make sure it was actually added
			return await this.groups.findOne({ id: group.id }) as Group;
		}
		catch (error) {
			throw new Error(error);
		}
	}


	/**
     * Update a group's details
     * @param groupId - The ID of the group to update
     * @param group - Updated group data
     *
     * @return {Group} The updated group
     */
	async updateGroup(groupId, group: Group): Promise<Group> {
		const groupExists = await this.groups.findOne({ id: groupId });
		if (!groupExists) {
			throw new Error('Group not found');
		}

		if(!group.label || !group.admins || !group.channels) {
			throw new TypeError('Group is missing required fields');
		}

		try {
			await this.groups.updateOne({ id: group.id }, { $set: group });

			// Return the group, fetched from the database to make sure it was actually updated
			return await this.groups.findOne({ id: group.id }) as Group;
		}
		catch (error) {
			throw new Error(error);
		}
	}


	/**
     * Find a channel by its ID
     * @param channelId
     *
     * @return {Channel} The channel details
     */
	async getChannel(channelId: string): Promise<Channel | null> {
		const result = await this.groups.findOne({
			channels: { $elemMatch: { id: channelId } }
		});

		if (!result) {
			throw new Error('Channel not found');
		}

		return result.channels.find((channel: Channel) => channel.id === channelId);
	}


	/**
     * Create a new channel in a group
     * @param groupId
     * @param channel
     *
     * @return {Group} The updated group
     */
	async createChannel(groupId: string, channel: Channel): Promise<Group> {
		const channelExistsWithName = await this.groups.findOne({
			channels: { $elemMatch: { label: channel.label } }
		});

		if (channelExistsWithName) {
			throw new Error('Channel already exists');
		}

		try {
			await this.groups.updateOne(
				{ id: groupId },
				{ $push: { channels: channel } }
			);

			// Return the group, re-fetched from the database
			return await this.getGroup(groupId);
		}
		catch (error) {
			throw new Error(error);
		}
	}


	/**
     * Delete a channel from a group
     * @param channelId
     *
     * @return {Group} The updated group
     */
	async deleteChannel(channelId: string): Promise<Group> {
		const group = await this.groups.findOne({
			channels: { $elemMatch: { id: channelId } }
		});

		if (!group) {
			throw new Error('Channel not found');
		}

		await this.groups.updateOne(
			{ id: group.id },
			{ $pull: { channels: { id: channelId } } }
		);

		// Return the updated group, retrieved from the database
		return await this.getGroup(group.id);
	}
}
