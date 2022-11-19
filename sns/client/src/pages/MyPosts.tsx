import { useParams } from 'react-router-dom';
import Posts from '../components/Posts';
import PostService from '../service/post';

interface IPostPage {
	postService: PostService;
}

const MyPosts = ({ postService }: IPostPage) => {
	const { userId } = useParams();
	return <Posts postService={postService} userId={userId} addable={true} />;
};

export default MyPosts;
