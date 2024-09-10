import express from 'express';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import users from './data/users.json' assert { type: 'json' };
import groups from './data/groups.json' assert { type: 'json' };
import { fileURLToPath } from 'url';
import path from 'node:path';

// Basic setup
const app = express();
const port = process.env.PORT || 4100;

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Hello Chatty!'
	});
});

/**
 * GET /groups
 * @summary Get a given user's groups
 * @param {string} userId.query.required - The user's email
 * @return {object} 200 - success response
 */
app.get('/groups', (req, res) => {
	const userId = req.query.userId;

	// If no userId, return 400
	if (!userId) {
		return res.status(400).json({
			error: 'userId is required'
		});
	}

	// Find the user
	const user = users.find(user => user.email === userId);

	// If user not found, return 404
	if (!user) {
		return res.status(404).json({
			error: 'User not found'
		});
	}

	return res.status(200).json(user.groupIds.map(groupId => {
		return groups.find(group => group.id === groupId);
	}));
});

// Documentation setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
expressJSDocSwagger(app)({
	info: {
		version: '0.0.1',
		title: 'Chatty',
	},
	security: {
		BasicAuth: {
			type: 'http',
			scheme: 'basic',
		},
	},
	baseDir: __dirname,
	filesPattern: './**/*.ts',
	swaggerUIPath: '/docs',
	exposeSwaggerUI: true,
	exposeApiDocs: false,
	notRequiredAsNullable: false,
	swaggerUiOptions: {},
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
