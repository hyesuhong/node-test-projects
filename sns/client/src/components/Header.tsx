import { memo } from 'react';

interface IHeader {
	userId: string;
	onLogout: React.MouseEventHandler<HTMLButtonElement>;
	onMyPosts: React.MouseEventHandler<HTMLButtonElement>;
	onAllPosts: React.MouseEventHandler<HTMLButtonElement>;
}

const Header = memo(({ userId, onLogout, onMyPosts, onAllPosts }: IHeader) => {
	return (
		<header>
			<div className='logo'>
				<img src='./logo.png' alt='Social Logo' className='logo-img' />
				<h1 className='logo-name'>Social</h1>
				{userId && <span className='logo-user'>@{userId}</span>}
			</div>
			{userId && (
				<nav className='menu'>
					<button onClick={onAllPosts}>All</button>
					<button onClick={onMyPosts}>My</button>
					<button onClick={onLogout} className='menu-item'>
						Logout
					</button>
				</nav>
			)}
		</header>
	);
});

export default Header;
