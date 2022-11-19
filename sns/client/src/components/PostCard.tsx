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
		const { id, userId, userName, createdDate, url, msg } = post;
		const [editing, setEditing] = useState(false);
		const onClose = () => setEditing(false);

		return (
			<li className='post'>
				<section className='post-container'>
					<Avatar url={url} userName={userName} />
					<div className='post-body'>
						<span className='post-name'>{userName}</span>
						<span className='post-id' onClick={() => onUserNameClick(post)}>
							@{userId}
						</span>
						<span className='post-date'> · {parseDate(createdDate)}</span>
						<p>{msg}</p>
						{editing && (
							<EditPostForm post={post} onUpdate={onUpdate} onClose={onClose} />
						)}
					</div>
				</section>
				{owner && (
					<div className='post-action'>
						<button className='post-action-btn' onClick={() => onDelete(id)}>
							X
						</button>
						<button
							className='post-actino-btn'
							onClick={() => setEditing(true)}
						>
							✎
						</button>
					</div>
				)}
			</li>
		);
	}
);

export default PostCard;
