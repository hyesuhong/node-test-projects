import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import http from 'http';
import { Http2SecureServer } from 'http2';
import { config } from '../config';

interface socketType {
	io: Server;
}

class Socket implements socketType {
	readonly io: Server;

	constructor(server: http.Server | Http2SecureServer) {
		this.io = new Server(server, {
			cors: { origin: '*' },
		});
		this.io.use((socket, next) => {
			const token = socket.handshake.auth.token;
			console.log(socket);
			if (!token) {
				return next(new Error('Authentication error'));
			}

			jwt.verify(
				token,
				config.jwt.secretKey,
				async <T = jwt.Jwt | jwt.JwtPayload | string>(
					error: jwt.VerifyErrors | null,
					decoded: T | undefined
				) => {
					if (error) {
						return next(new Error('Authentication error'));
					}
					next();
				}
			);
		});

		this.io.on('connection', (socket) => {
			console.log('Socket client connected');
		});
	}
}

let socket: Socket | undefined = undefined;

export function initSocket(server: http.Server | Http2SecureServer) {
	if (!socket) {
		socket = new Socket(server);
	}
}

export function getSocketIO() {
	if (!socket) {
		throw new Error('Please call init first');
	}
	return socket.io;
}
