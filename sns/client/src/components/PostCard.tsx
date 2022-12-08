import { memo, useState } from 'react';
import { IPost } from '../service/post';
import parseDate from '../util/date';
import Avatar from './Avatar';
import EditPostForm from './EditPostForm';

interface ICard {
	post: IPost;
	owner: boolean;
	onDelete: any;
	onUpdate: any;
	onUserNameClick: any;
}
const PostCard = memo(
	({ post, owner, onDelete, onUpdate, onUserNameClick }: ICard) => {
		const { id, uid, userId, name, createdDate, url, msg } = post;
		const [editing, setEditing] = useState(false);
		const onClose = () => setEditing(false);

		return (
			<li className='post'>
				<section className='post-container'>
					<div className='post-head'>
						<Avatar url={url} userName={uid ? uid : 'unknown'} />
						<span className='post-name'>{name ? name : 'unknown'}</span>
						<span className='post-id' onClick={() => onUserNameClick(post)}>
							@{uid ? uid : 'unknown'}
						</span>
						<span className='post-date'>{parseDate(createdDate)}</span>
					</div>
					<div className='post-body'>
						<p>{msg}</p>
						{editing && (
							<EditPostForm post={post} onUpdate={onUpdate} onClose={onClose} />
						)}
					</div>
				</section>
				{owner && !editing && (
					<div className='post-action'>
						<button
							className='post-action-btn post-edit-btn'
							onClick={() => setEditing(true)}
						></button>
						<button
							className='post-action-btn post-delete-btn'
							onClick={() => onDelete(id)}
						></button>
					</div>
				)}
			</li>
		);
	}
);

export default PostCard;
