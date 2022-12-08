import React, { useState } from 'react';
import Banner from '../components/Banner';

interface ILogin {
	onSignUp: any;
	onLogin: any;
}

function Login({ onSignUp, onLogin }: ILogin) {
	const [signUp, setSignup] = useState(false);
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [url, setURL] = useState('');
	const [text, setText] = useState('');
	const [isAlert, setIsAlert] = useState(false);

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (signUp) {
			onSignUp(userId, password, name, email, url).catch(setError);
		} else {
			onLogin(userId, password).catch(setError);
		}
	};

	const setError = (error: any) => {
		console.log(error);
		setText(error.toString());
		setIsAlert(true);
	};

	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
		const {
			currentTarget: { name, value, checked },
		} = event;

		switch (name) {
			case 'userId':
				return setUserId(value);
			case 'password':
				return setPassword(value);
			case 'name':
				return setName(value);
			case 'email':
				return setEmail(value);
			case 'url':
				return setURL(value);
			case 'sign':
				return setSignup(value === 'up');
			default:
		}
	};

	return (
		<>
			<Banner text={text} isAlert={isAlert} />
			<form className='auth-form' onSubmit={onSubmit}>
				<div className='form-signup'>
					<p>
						<input
							name='sign'
							type='radio'
							value='in'
							onChange={onChange}
							id='signin'
							checked={!signUp}
						/>
						<label htmlFor='signin'>Sign In</label>
					</p>
					<p>
						<input
							name='sign'
							type='radio'
							value='up'
							onChange={onChange}
							id='signup'
						/>
						<label htmlFor='signup'>Sign Up</label>
					</p>
				</div>
				<input
					name='userId'
					type='text'
					placeholder='ID'
					value={userId}
					onChange={onChange}
					className='form-input'
					required
				/>
				<input
					name='password'
					type='password'
					placeholder='Password'
					value={password}
					onChange={onChange}
					className='form-input'
					required
				/>
				{signUp && (
					<>
						<input
							name='name'
							type='text'
							placeholder='Name'
							value={name}
							onChange={onChange}
							className='form-input'
							required
						/>
						<input
							name='email'
							type='email'
							placeholder='Email'
							value={email}
							onChange={onChange}
							className='form-input'
							required
						/>
						<input
							name='url'
							type='url'
							placeholder='Profile Image URL'
							value={url}
							onChange={onChange}
							className='form-input'
						/>
					</>
				)}
				<button className='auth-form-btn'>
					{signUp ? 'Sign Up' : 'Sign In'}
				</button>
			</form>
		</>
	);
}

export default Login;
