import React, { useState } from 'react';
import PostService, { IPost } from '../service/post';

interface INewForm {
	postService: PostService;
	onError: any;
	onCreated: any;
}

const NewPostForm = ({ postService, onError, onCreated }: INewForm) => {
	const [post, setPost] = useState('');

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		postService
			.createPost(post)
			.then((created: IPost) => {
				setPost('');
				onCreated(created);
			})
			.catch(onError);
	};

	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
		setPost(event.currentTarget.value);
	};

	return (
		<form className='post-form' onSubmit={onSubmit}>
			<input
				type='text'
				placeholder='Send new post!'
				value={post}
				required
				autoFocus
				onChange={onChange}
				className='form-input'
			/>
			<button type='submit' className='form-btn'></button>
		</form>
	);
};

export default NewPostForm;
