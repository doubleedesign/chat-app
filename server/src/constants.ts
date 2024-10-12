import { DatabaseConnection } from './datasources/mongodb.ts';

export const DATABASE_NAME = 'chatapp-db';

export async function getDatabase(): Promise<DatabaseConnection> {
	return await DatabaseConnection.create(DATABASE_NAME);
}