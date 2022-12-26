// interface IUser {
// 	id: number;
// 	uid: string;
// 	password: string;
// 	name: string;
// 	email: string;
// 	url?: string;
// }

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

let users: IUser[] = [
	{
		id: 0,
		uid: 'bobishere',
		password: '$2b$12$qO8THWWNA/WZPGxOAsUHlOilqsDATNEgKpP7Qkgi5OyNRQGitt2w.',
		name: 'Bob',
		email: 'mail@mail.com',
		url: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Wayfarers&hairColor=Black&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=CollarSweater&clotheColor=Gray01&eyeType=Side&eyebrowType=UpDownNatural&mouthType=ScreamOpen&skinColor=DarkBrown',
	},
	{
		id: 1,
		uid: 'ellie',
		password: '$2b$12$qO8THWWNA/WZPGxOAsUHlOilqsDATNEgKpP7Qkgi5OyNRQGitt2w.',
		name: 'Ellie',
		email: 'ellie@mail.com',
	},
];

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
