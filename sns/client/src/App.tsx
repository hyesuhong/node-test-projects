import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useAuth } from './context/AuthContext';
import AllPosts from './pages/AllPosts';
import MyPosts from './pages/MyPosts';
import PostService from './service/post';

interface IAuth {
	user?: any;
	logout?: any;
}

interface IApp {
	postService: PostService;
}

function App({ postService }: IApp) {
	const navigate = useNavigate();
	const { user, logout }: IAuth = useAuth();

	const onAllPosts = () => {
		navigate('/');
	};

	const onMyPosts = () => {
		navigate(`/${user.userId}`);
	};

	const onLogout = () => {
		if (window.confirm('Do you want to log out?')) {
			logout();
			navigate('/');
		}
	};

	return (
		<div className='app'>
			<Header
				user={user.userId}
				onLogout={onLogout}
				onAllPosts={onAllPosts}
				onMyPosts={onMyPosts}
			/>
			{/* <BrowserRouter> */}
			<Routes>
				<Route path='/' element={<AllPosts postService={postService} />}>
					<Route
						path='/:userId'
						element={<MyPosts postService={postService} />}
					/>
				</Route>
			</Routes>
			{/* </BrowserRouter> */}
		</div>
	);
}

export default App;
