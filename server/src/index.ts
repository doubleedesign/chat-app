import express from 'express';
const app = express();
const port = process.env.PORT || 4100;

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Hello Chatty!'
	});
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
