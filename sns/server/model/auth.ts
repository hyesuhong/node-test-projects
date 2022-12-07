// interface IUser {
// 	id: number;
// 	uid: string;
// 	password: string;
// 	name: string;
// 	email: string;
// 	url?: string;
// }

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
		url: 'https://joeschmoe.io/api/v1/random',
	},
];

export async function findByUserId(uid: string) {
	console.log(users);
	return users.find((user) => user.uid === uid);
}

export async function findById(id: number) {
	return users.find((user) => user.id === id);
}

export async function createUser(user: ISign) {
	const created = { ...user, id: users.length };
	users.push(created);
	return created.id;
}
