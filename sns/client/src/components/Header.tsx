import { memo } from 'react';
import { ISignup } from '../service/auth';
import Avatar from './Avatar';

interface IHeader {
	user?: string;
	onLogout?: React.MouseEventHandler<HTMLButtonElement>;
	onMyPosts?: React.MouseEventHandler<HTMLButtonElement>;
	onAllPosts?: React.MouseEventHandler<HTMLButtonElement>;
}

const Header = memo(({ user, onLogout, onMyPosts, onAllPosts }: IHeader) => {
	return (
		<header>
			<div className='logo'>
				<h1 className='logo-name'>Social</h1>
			</div>
			{user && (
				<nav>
					<ul className='menu'>
						<li>
							<button className='menu-item' onClick={onAllPosts}>
								All
							</button>
						</li>
						<li>
							<button className='menu-item' onClick={onMyPosts}>
								My
							</button>
						</li>
						<li>
							<button className='menu-item' onClick={onLogout}>
								Logout
							</button>
						</li>
					</ul>
					<Avatar userName={user} />
				</nav>
			)}
			{/* {userId && <span className='logo-user'>@{userId}</span>} */}
		</header>
	);
});

export default Header;
