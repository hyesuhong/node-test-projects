import { memo } from 'react';

interface IAvatar {
	url?: string;
	userName: string;
}

const Avatar = memo(({ url, userName }: IAvatar) => {
	return (
		<div className='avatar-wrap'>
			{!!url ? (
				<img src={url} alt='profile image' className='avatar-img' />
			) : (
				<div className='avatar-txt'>{userName[0].toUpperCase()}</div>
			)}
		</div>
	);
});

export default Avatar;
