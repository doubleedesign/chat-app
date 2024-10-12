import { DatabaseConnection } from './mongodb.ts';
import { TEST_DATABASE_NAME } from '../../jest.setup.ts';
import { generateSingleGroup, generateSingleUser } from '../../utils/test.utils.ts';
import { Collection, MongoClient } from 'mongodb';

describe('MongoDB datasource', () => {
	let db: DatabaseConnection;

	beforeAll(async () => {
		db = await DatabaseConnection.create(TEST_DATABASE_NAME);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('Users', () => {

		test('getUser', async () => {
			const user = await db.getUser('leesa.ward@griffithuni.edu.au');

			expect(user).toEqual(expect.objectContaining({
				name: 'Leesa Ward',
				email: 'leesa.ward@griffithuni.edu.au',
				avatar: '',
			}));
		});

		test('getUser throws an error if the user does not exist', async () => {
			await expect(db.getUser('notauser@example.com')).rejects.toThrow('User not found');
		});

		test('createUser', async () => {
			const user = generateSingleUser();

			const newUser = await db.createUser(user);

			expect(newUser).toEqual(user);
		});

		test('createUser throws an error if the user already exists', async () => {
			await expect(db.createUser({
				name: 'Leesa Ward',
				email: 'leesa.ward@griffithuni.edu.au',
				avatar: '',
				groupIds: []
			})).rejects.toThrow('User already exists');
		});

		test('createUser throws an error if a required field is missing', async () => {
			// @ts-expect-error TS2345: Argument of type { name: string; } is not assignable to parameter of type Use
			await expect(db.createUser({ name: 'Incomplete user' })).rejects.toThrow(TypeError);
		});

		test('createUser throws an error if insertOne fails', async () => {
			const spy = jest.spyOn(Collection.prototype, 'insertOne').mockRejectedValue(new Error('Database update failed'));

			const user = generateSingleUser();
			await expect(db.createUser(user)).rejects.toThrow('Database update failed');
			expect(spy).toHaveBeenCalledWith(user);
		});
	});

	describe('Groups', () => {

		test('getGroups for user', async () => {
			const result = await db.getGroupsForUser('leesa.ward@griffithuni.edu.au');

			console.log(result);

			expect(result.map((group) => group.label)).toEqual([
				'Economists',
				'Recreational Directors',
				'Software Developers'
			]);
		});

		test('getGroupsForUser throws an error if the user does not exist', async () => {
			await expect(db.getGroupsForUser('notauser@example.com')).rejects.toThrow('User not found');
		});

		test('getGroup', async () => {
			const group = await db.getGroup('rik1lvWY0O2w');

			expect(group).toEqual(expect.objectContaining({
				label: 'Software Developers'
			}));
		});

		test('getGroup throws an error if the group does not exist', async () => {
			await expect(db.getGroup('abc')).rejects.toThrow('Group not found');
		});

		test('createGroup', async () => {
			const group = generateSingleGroup();

			const newGroup = await db.createGroup(group);

			expect(newGroup).toEqual(group);
		});

		test('createGroup throws an error if the group already exists', async () => {
			await expect(db.createGroup({
				id: 'rik1lvWY0O2w',
				label: 'Software Developers',
				avatar: '',
				admins: [],
				channels: []
			})).rejects.toThrow('Group already exists');
		});

		test('createGroup throws an error if a required field is missing', async () => {
			// @ts-expect-error TS2345: Argument of type { id: string; } is not assignable to parameter of type Group
			await expect(db.createGroup({ id: 'abc' })).rejects.toThrow(TypeError);
		});

		test('createGroup throws an error if insertOne fails', async () => {
			const spy = jest.spyOn(Collection.prototype, 'insertOne').mockRejectedValue(new Error('Database update failed'));

			const group = generateSingleGroup();

			await expect(db.createGroup(group)).rejects.toThrow('Database update failed');
			expect(spy).toHaveBeenCalledWith(group);
		});

		test('updateGroup', async () => {
			const group = await db.getGroup('rik1lvWY0O2w');

			const updatedGroup = await db.updateGroup({
				...group,
				label: 'Software Engineers'
			});

			expect(updatedGroup).toEqual(expect.objectContaining({
				// Assert what should have changed
				label: 'Software Engineers',
				// Assert some stuff that shouldn't change
				avatar: group.avatar,
				admins: group.admins,
			}));
		});

		test('updateGroup throws an error if the group does not exist', async () => {
			await expect(db.updateGroup({
				id: 'abc',
				label: 'Software Engineers',
				avatar: '',
				admins: [],
				channels: []
			})).rejects.toThrow('Group not found');
		});

		test('updateGroup throws an error if updateOne fails', async() => {
			const spy = jest.spyOn(Collection.prototype, 'updateOne').mockRejectedValue(new Error('Database update failed'));

			await expect(db.updateGroup({
				id: 'rik1lvWY0O2w',
				label: 'Software Engineers',
				avatar: '',
				admins: [],
				channels: []
			})).rejects.toThrow('Database update failed');

			expect(spy).toHaveBeenCalledWith({ id: 'rik1lvWY0O2w' }, { $set: expect.any(Object) });
		});
	});
});