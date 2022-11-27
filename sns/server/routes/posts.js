import express from 'express';

let posts = [
	{
		id: 2,
		msg: 'Dream Coding 👍',
		createdDate: '2022-11-17T23:19:57.000Z',
		userId: 'ellie',
		userName: 'Ellie',
		url: 'https://joeschmoe.io/api/v1/random',
	},
	{
		id: 1,
		msg: 'Hi :D',
		createdDate: '2022-11-17T23:19:57.000Z',
		userId: 'bob',
		userName: 'Bob',
	},
];
const router = express.Router();

// GET /posts
// GET /posts?userId=bob
router.get('/', (req, res, next) => {
	const { userId } = req.query;
	const data = userId ? posts.filter((post) => post.userId === userId) : posts;
	console.log(data);
	res.status(200).json(data);
});

// GET /posts/1
router.get('/:id', (req, res, next) => {
	const { id } = req.params;
	const post = posts.find((post) => post.id === Number(id));
	if (post) {
		res.status(200).json(post);
	} else {
		res.status(404).json({ message: `post id(${id}) not found` });
	}
});

// POST /posts
router.post('/', (req, res, next) => {
	const { msg, userId, userName } = req.body;
	const post = {
		id: Date.now(),
		msg,
		createdDate: new Date(),
		userId,
		userName,
	};
	posts = [post, ...posts];

	res.status(201).json(post);
});

// PUT /posts/1
router.put('/:id', (req, res, next) => {
	const { id } = req.params;
	const { msg } = req.body;
	const postIndex = posts.findIndex((post) => post.id === Number(id));
	if (postIndex < 0) {
		res.status(404).json({ message: `post id(${id}) not found` });
	} else {
		posts[postIndex].msg = msg;
		console.log(posts[postIndex]);
		res.status(200).json(posts[postIndex]);
	}
});

// DELETE /posts/1
router.delete('/:id', (req, res, next) => {
	const { id } = req.params;
	posts = posts.filter((post) => post.id !== Number(id));

	res.sendStatus(204);
});

export default router;
