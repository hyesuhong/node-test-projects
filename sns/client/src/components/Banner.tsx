import { memo } from 'react';

interface IBanner {
	text: string;
	isAlert: boolean;
}

const Banner = memo(({ text, isAlert }: IBanner) => (
	<>
		{text && (
			<p className={`banner ${isAlert ? 'banner-red' : 'banner-green'}`}>
				{text}
			</p>
		)}
	</>
));

export default Banner;
