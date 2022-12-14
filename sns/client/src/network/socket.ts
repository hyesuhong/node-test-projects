import socket, { Socket } from 'socket.io-client';

type CallbackFN = (...args: any[]) => void;

export default class SocketClass {
	readonly io: Socket;
	constructor(baseURL: string, getAccessToken: CallbackFN) {
		this.io = socket(baseURL, {
			auth: (cb) => cb({ token: getAccessToken() }),
		});

		this.io.on('connect_error', (error) => {
			console.error('socket error', error);
		});
	}

	onSync(event: string, callback: CallbackFN) {
		if (!this.io.connected) {
			this.io.connect();
		}

		this.io.on(event, (message) => callback(message));
		return () => this.io.off(event);
	}
}
