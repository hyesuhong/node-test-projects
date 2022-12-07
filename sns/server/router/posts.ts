import express from 'express';
import { body } from 'express-validator';
import * as postController from '../controller/posts';
import { isAuth } from '../middleware/auth';
import { validate } from '../middleware/validator';

const router = express.Router();

const validatePost = [
	body('msg')
		.trim()
		.isLength({ min: 2 })
		.withMessage(`Message should be at least 2 characthers.`),
	validate,
];

// GET /posts
// GET /posts?userId=bob
router.get('/', isAuth, postController.getPosts);

// GET /posts/1
router.get('/:id', isAuth, postController.getPost);

// POST /posts
router.post('/', isAuth, validatePost, postController.createPost);

// PUT /posts/1
router.put('/:id', isAuth, validatePost, postController.updatePost);

// DELETE /posts/1
router.delete('/:id', isAuth, postController.deletePost);

export default router;
