import { DatabaseConnection } from './mongodb.ts';
import { TEST_DATABASE_NAME } from '../../jest.setup.ts';
import { generateSingleGroup, generateSingleUser } from '../../utils/test.utils.ts';

describe('MongoDB datasource', () => {
	let db: DatabaseConnection;

	beforeAll(async () => {
		db = await DatabaseConnection.create(TEST_DATABASE_NAME);
	});

	test('getUser', async () => {
		const user = await db.getUser('leesa.ward@griffithuni.edu.au');

		expect(user).toEqual(expect.objectContaining({
			name: 'Leesa Ward',
			email: 'leesa.ward@griffithuni.edu.au',
			avatar: '',
		}));
	});

	test('createUser', async () => {
		const user = generateSingleUser();

		const newUser = await db.createUser(user);

		expect(newUser).toEqual(user);
	});

	test('getGroups for user', async () => {
		const result = await db.getGroupsForUser('leesa.ward@griffithuni.edu.au');

		console.log(result);

		expect(result.map((group) => group.label)).toEqual([
			'Economists',
			'Recreational Directors',
			'Software Developers'
		]);
	});

	test('getGroup', async () => {
		const group = await db.getGroup('rik1lvWY0O2w');

		expect(group).toEqual(expect.objectContaining({
			label: 'Software Developers'
		}));
	});

	test('createGroup', async () => {
		const group = generateSingleGroup();

		const newGroup = await db.createGroup(group);

		expect(newGroup).toEqual(group);
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
});