import { Collection, Db, MongoClient } from 'mongodb';
import { Group, User, UserId } from '../types.ts';

export class DatabaseConnection {
	private client: MongoClient;
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
	async getGroup(groupId: string): Promise<Group | null> {
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
     * @param group - Updated group data
     *
     * @return {Group} The updated group
     */
	async updateGroup(group: Group): Promise<Group> {
		const groupExists = await this.groups.findOne({ id: group.id });

		if (!groupExists) {
			throw new Error('Group not found');
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
}
