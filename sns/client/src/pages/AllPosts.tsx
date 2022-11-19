import Posts from '../components/Posts';
import PostService from '../service/post';

interface IPostPage {
	postService: PostService;
}

const AllPosts = ({ postService }: IPostPage) => (
	<Posts postService={postService} addable={true} />
);

export default AllPosts;
