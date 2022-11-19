import React, { useState } from 'react';
import { IPost } from '../service/post';

interface IEditForm {
	post: IPost;
	onUpdate: any;
	onClose: any;
}

const EditPostForm = ({ post, onUpdate, onClose }: IEditForm) => {
	const [text, setText] = useState(post.msg);

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onUpdate(post.id, text);
		onClose();
	};

	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
		setText(event.currentTarget.value);
	};

	return (
		<form className='edit-post-form' onSubmit={onSubmit}>
			<input
				type='text'
				placeholder='Edit your post'
				value={text}
				required
				autoFocus
				onChange={onChange}
				className='form-input post-input'
			/>
			<div className='edit-post-form-action'>
				<button className='form-btn-update' type='submit'>
					Update
				</button>
				<button className='form-btn-cancel' type='button' onClick={onClose}>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default EditPostForm;
