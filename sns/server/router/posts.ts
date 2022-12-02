import express from 'express';
import * as postController from '../controller/posts';

const router = express.Router();

// GET /posts
// GET /posts?userId=bob
router.get('/', postController.getPosts);

// GET /posts/1
router.get('/:id', postController.getPost);

// POST /posts
router.post('/', postController.createPost);

// PUT /posts/1
router.put('/:id', postController.updatePost);

// DELETE /posts/1
router.delete('/:id', postController.deletePost);

export default router;
