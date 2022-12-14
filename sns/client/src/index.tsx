import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import AuthService from './service/auth';
import PostService from './service/post';
import { BrowserRouter } from 'react-router-dom';
import { AuthErrorEventBus, AuthProvider } from './context/AuthContext';
import httpClient from './network/http';
import Socket from './network/socket';
import TokenStorage from './db/token';

const baseURL = process.env.REACT_APP_BASE_URL
	? process.env.REACT_APP_BASE_URL
	: 'http://localhost:8080';
const authErrorEventBus = new AuthErrorEventBus();
const HttpClient = new httpClient(baseURL, authErrorEventBus);
const tokenStorage = new TokenStorage();
const authService = new AuthService(HttpClient, tokenStorage);
const socketClient = new Socket(baseURL, () => {
	return tokenStorage.getToken();
});
const postService = new PostService(HttpClient, tokenStorage, socketClient);

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
