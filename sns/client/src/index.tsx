import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import AuthService from './service/auth';
import PostService from './service/post';
import { BrowserRouter } from 'react-router-dom';
import { AuthErrorEventBus, AuthProvider } from './context/AuthContext';

const baseURL = process.env.REACT_APP_BASE_URL
	? process.env.REACT_APP_BASE_URL
	: 'http://localhost:8080';
const authErrorEventBus = new AuthErrorEventBus();
const authService = new AuthService();
const postService = new PostService(baseURL);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider
				authService={authService}
				authErrorEventBus={authErrorEventBus}
			>
				<App postService={postService} />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
