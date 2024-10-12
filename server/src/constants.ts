import { DatabaseConnection } from './datasources/mongodb.ts';

export const DATABASE_NAME = 'chatapp-db';
export const db = await DatabaseConnection.create(DATABASE_NAME);