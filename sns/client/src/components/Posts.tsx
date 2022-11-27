import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PostService, { IPost } from '../service/post';
import Banner from './Banner';
import NewPostForm from './NewPostForm';
import PostCard from './PostCard';

interface IPosts {
	postService: PostService;
	userId?: string;
	addable: boolean;
}

interface IUser {
	user?: any;
}

const Posts = memo(({ postService, userId, addable }: IPosts) => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [error, setError] = useState('');
	const naviagte = useNavigate();
	const { user }: IUser = useAuth();

	useEffect(() => {
		postService
			.getPosts(userId)
			.then((posts) => setPosts([...posts]))
			.catch(onError);
	}, [postService, userId, user]);

	const onCreated = (post: IPost) => {
		setPosts((posts) => [post, ...posts]);
	};

	const onDelete = (postId: number) => {
		postService
			.deletePost(postId)
			.then(() =>
				setPosts((posts) => posts.filter((post) => post.id !== postId))
			)
			.catch((error) => setError(error.toString()));
	};

	const onUpdate = (postId: number, msg: string) => {
		postService
			.updatePost(postId, msg)
			.then((updated) =>
				setPosts((posts) =>
					posts.map((post) => (post.id === updated.id ? updated : post))
				)
			)
			.catch((error) => setError(error.toString()));
	};

	const onUserNameClick = (post: IPost) => naviagte(`/${post.userId}`);

	const onError = (error: Error) => {
		setError(error.toString());
		setTimeout(() => setError(''), 3000);
	};

	return (
		<>
			{addable && (
				<NewPostForm
					postService={postService}
					onError={onError}
					onCreated={onCreated}
				/>
			)}
			{error && <Banner text={error} isAlert={true} />}
			{posts.length === 0 && <p className='posts-empty'>No Posts Yet</p>}
			<ul className='posts'>
				{posts.map((post) => (
					<PostCard
						key={post.id}
						post={post}
						owner={post.userId === user.userId}
						onDelete={onDelete}
						onUpdate={onUpdate}
						onUserNameClick={onUserNameClick}
					/>
				))}
			</ul>
		</>
	);
});

export default Posts;
