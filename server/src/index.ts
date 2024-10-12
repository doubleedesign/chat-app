import express, { Application } from 'express';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import path from 'node:path';
import endpoints from './endpoints';
import expressListEndpoints from 'express-list-endpoints';
import { CustomActionsPlugin } from './docs/plugins';
import { CustomComponentOverridePlugin } from './docs/plugin-component-override.tsx';
import cors from 'cors';
import { getFileInfo } from './utils.ts';
import { DATABASE_NAME } from './constants.ts';
import { MongoClient } from 'mongodb';
import { populateMockData } from './utils.ts';

// Basic setup
const app: Application = express();
const port = process.env.PORT || 4100;
const env = process.env.NODE_ENV.toString().trim() || 'development';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));
app.use(cors());

// Allow CORS from local front-end
app.use(cors({
	origin: 'http://localhost:4200',
}));

// Insert imported routes
Object.entries(endpoints).map(([key, value]) => (
	app.use('/', endpoints[key])
));

// Documentation setup (exclude from test environment)
if(env !== 'test') {
	const { __dirname } = getFileInfo();
	// Set up routes for files I want to be able to access from the Swagger front-end
	// without these, they would need to be in a "/static" folder; I prefer to keep everything Swagger-related in one folder i.e. "/docs"
	app.get('/docs/swagger-ui-styles.css', (req, res) => {
		res.sendFile(path.resolve('./src/docs/swagger-ui-styles.css'));
	});
	app.get('/docs/swagger-ui-hacks.js', (req, res) => {
		res.sendFile(path.resolve('./src/docs/swagger-ui-hacks.js'));
	});
	app.get('/docs/groups.json', (req, res) => {
		res.sendFile(path.resolve('./data/groups.json'));
	});
	app.get('/docs/users.json', (req, res) => {
		res.sendFile(path.resolve('./data/users.json'));
	});


	// Swagger config
	expressJSDocSwagger(app)({
		info: {
			version: '0.0.2',
			title: 'Chatty',
			description: 'Chat app API for 3813ICT Software Frameworks',
		},
		security: {},
		baseDir: __dirname,
		filesPattern: ['./endpoints/**/*.ts', './types.ts'],
		swaggerUIPath: '/docs',
		exposeSwaggerUI: true,
		exposeApiDocs: false,
		notRequiredAsNullable: false,
		swaggerUiOptions: {
			swaggerOptions: {
				tagsSorter: (a, b) => b.localeCompare(a),
				operationsSorter: (a, b) => {
					const methodsOrder = ['get', 'post', 'put', 'patch', 'delete'];
					const indexOfA = methodsOrder.indexOf(a.get('method'));
					const indexOfB = methodsOrder.indexOf(b.get('method'));

					return indexOfA - indexOfB;
				},
				displayModels: true,
				defaultModelsExpandDepth: 10, // Expands the Types (models) section
				defaultModelExpandDepth: 3, // Expands the models inside the responses
				supportedSubmitMethods: [], // empty disables "Try it out" option for all methods
				requestSnippetsEnabled: false,
				plugins: [CustomActionsPlugin, CustomComponentOverridePlugin]
			},
			customCssUrl: [
				'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;600&family=Inter+Tight:wght@300;600&display=swap',
				'../docs/swagger-ui-styles.css'
			],
			customJs: ['../docs/swagger-ui-hacks.js']
		},
	});
}

// Run the server if we are in the development environment
if(env === 'development') {
	app.listen(port, () => {
		console.log('================================================');

		// If the database is empty (using my account as a proxy measure for 'emtpy'), add the mock data
		const client = new MongoClient('mongodb://localhost:27017');
		client.connect().then(async () => {
			const db = client.db(DATABASE_NAME);
			const iAmHere = await db.collection('users').findOne({ email: 'leesa.ward@griffithuni.edu.au' });
			if (!iAmHere) {
				console.log('Database is probably empty, populating with mock data');
				await populateMockData(db);
				console.log('================================================');
			}
		});

		const endpoints = expressListEndpoints(app);
		console.log(`Server running on port ${port}`);
		console.log('Available endpoints:');
		console.log(endpoints.filter(({ path }) => !path.startsWith('/docs/')).map(({ path, methods }) => ({
			path,
			methods
		})));
	});
}

export default app;
