import { OkPacket, RowDataPacket } from 'mysql2';
import { db } from '../db/database';

interface ISign {
	uid: string;
	password: string;
	name: string;
	email: string;
	url?: string;
}

interface IUser extends ISign {
	id: number;
}

export async function findByUserId(uid: string) {
	/* return users.find((user) => user.uid === uid); */
	return await db
		.execute<RowDataPacket[]>('SELECT * FROM users WHERE uid=?', [uid])
		.then((result) => {
			// console.log(result);
			return result[0][0];
		});
}

export async function findById(id: number) {
	// console.log(users, id);
	/* return users.find((user) => user.id === id); */
	return await db
		.execute<RowDataPacket[]>('SELECT * FROM users WHERE id=?', [id])
		.then((result) => {
			// console.log(result);
			return result[0][0];
		});
}

export async function createUser({ uid, password, name, email, url }: ISign) {
	/* const created = { ...user, id: users.length };
	users.push(created);
	return created.id; */
	return await db
		.execute<OkPacket>(
			'INSERT INTO users (uid, password, name, email, url) VALUES (?,?,?,?,?)',
			[uid, password, name, email, url]
		)
		.then((result) => {
			// console.log(result);
			return result[0].insertId;
		});
}
