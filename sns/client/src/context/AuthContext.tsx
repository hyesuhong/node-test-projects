import {
	createContext,
	createRef,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from 'react';
import Header from '../components/Header';
import Login from '../pages/Login';
import AuthService from '../service/auth';

const AuthContext = createContext({});
const contextRef = createRef();

interface IAuthProvider {
	authService: AuthService;
	authErrorEventBus: any;
	children: any;
}

interface IUser {
	uid: string;
	token: string;
}

export function AuthProvider({
	authService,
	authErrorEventBus,
	children,
}: IAuthProvider) {
	const [user, setUser] = useState<IUser | undefined>(undefined);

	useImperativeHandle(contextRef, () => (user ? user.token : undefined));

	useEffect(() => {
		authErrorEventBus.listen((err: any) => {
			console.error(err);
			setUser(undefined);
		});
	}, [authErrorEventBus]);

	useEffect(() => {
		authService.isMe().then(setUser).catch(console.error);
	}, [authService]);

	const signUp = useCallback(
		async (
			userId: string,
			password: string,
			userName: string,
			email?: string,
			url?: string
		) =>
			authService
				.signup({ userId, password, userName, email, url })
				.then((user: IUser) => {
					setUser(user);
				})
				.catch(console.error),
		[authService]
	);

	const login = useCallback(
		async (userId: string, password: string) => {
			authService
				.login({ userId, password })
				.then((user: IUser) => {
					setUser(user);
				})
				.catch(console.error);
		},
		[authService]
	);

	const logout = useCallback(
		async () => authService.logout().then(() => setUser(undefined)),
		[authService]
	);

	const context = useMemo(
		() => ({ user, signUp, login, logout }),
		[user, signUp, login, logout]
	);

	return (
		<AuthContext.Provider value={context}>
			{user ? (
				children
			) : (
				<div className='app'>
					<Header />
					<Login onSignUp={signUp} onLogin={login} />
				</div>
			)}
		</AuthContext.Provider>
	);
}

export class AuthErrorEventBus {
	private callback: any;
	listen(callback: void) {
		this.callback = callback;
	}

	notify(error: any) {
		this.callback(error);
	}
}

export default AuthContext;
export const fetchToken = () => contextRef.current;
export const useAuth = () => useContext(AuthContext);
