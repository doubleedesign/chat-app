import express from 'express';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import { fileURLToPath } from 'url';
import path from 'node:path';
import endpoints from './endpoints';
import expressListEndpoints from 'express-list-endpoints';
import CustomActionsPlugin from './docs/plugins';
import cors from 'cors';

// Basic setup
const app = express();
const port = process.env.PORT || 4100;
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

// Documentation setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set up routes for files I want to be able to access from the Swagger front-end
// without these, they would need to be in a "/static" folder; I prefer to keep everything Swagger-related in one folder i.e. "/docs"
app.get('/docs/swagger-ui-styles.css', (req, res) => {
	res.sendFile(path.resolve('./src/docs/swagger-ui-styles.css'));
});
app.get('/docs/swagger-ui-hacks.js', (req, res) => {
	res.sendFile(path.resolve('./src/docs/swagger-ui-hacks.js'));
});
app.get('/docs/groups.json', (req, res) => {
	res.sendFile(path.resolve('./src/data/groups.json'));
});
app.get('/docs/users.json', (req, res) => {
	res.sendFile(path.resolve('./src/data/users.json'));
});


// Swagger config
expressJSDocSwagger(app)({
	info: {
		version: '0.0.1',
		title: 'Chatty',
		description: 'Chat app API for 3813ICT Software Frameworks',
	},
	security: {},
	baseDir: __dirname,
	filesPattern: './**/*.ts',
	swaggerUIPath: '/docs',
	exposeSwaggerUI: true,
	exposeApiDocs: false,
	notRequiredAsNullable: false,
	swaggerUiOptions: {
		swaggerOptions: {
			tagsSorter: (a, b) => b.localeCompare(a),
			operationsSorter: (a, b) => {
				const methodsOrder = ['get', 'post', 'put', 'delete', 'patch', 'options', 'trace'];
				const indexOfA = methodsOrder.indexOf(a.get('method'));
				const indexOfB = methodsOrder.indexOf(b.get('method'));

				return indexOfA - indexOfB;
			},
			defaultModelsExpandDepth: 10,
			supportedSubmitMethods: [], // empty disables "Try it out" option for all methods
			requestSnippetsEnabled: false,
			plugins: [CustomActionsPlugin]
		},
		customCssUrl: [
			'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;600&family=Inter+Tight:wght@300;600&display=swap',
			'../docs/swagger-ui-styles.css'
		],
		customJs: ['../docs/swagger-ui-hacks.js']
	},
});

app.listen(port, () => {
	const endpoints = expressListEndpoints(app);
	console.log('================================================');
	console.log(`Server running on port ${port}`);
	console.log('Available endpoints:');
	console.log(endpoints.filter(({ path }) => !path.startsWith('/docs/')).map(({ path, methods }) => ({
		path,
		methods
	})));
});
