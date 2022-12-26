import { OkPacket, RowDataPacket } from 'mysql2';
import { db } from '../db/database';
import * as userRepository from '../model/auth';

interface IPost {
	id: number;
	msg: string;
	createdDate: string;
	userId: number;
}

const SELECT_JOIN =
	'SELECT p.id, p.message, p.createdDate, p.userId, u.uid, u.name, u.url FROM posts as p JOIN users as u ON p.userId=u.id';
const ORDER_DESC = 'ORDER BY p.createdDate DESC';

export async function getAll() {
	/* return Promise.all(
		posts.map(async (post) => {
			const user = await userRepository.findById(post.userId);
			return { ...post, uid: user?.uid, name: user?.name, url: user?.url };
		})
	); */
	return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
}

export async function getAllByUser(uid: string) {
	/* const user = await userRepository.findByUserId(uid);
	if (!user) {
		return null;
	}
	return getAll().then((posts) => {
		return posts.filter((post) => post.userId === user.id);
	}); */
	return db
		.execute(`${SELECT_JOIN} WHERE u.uid=? ${ORDER_DESC}`, [uid])
		.then((result) => result[0]);
}

export async function getById(id: number) {
	/* const found = posts.find((post) => post.id === Number(id));
	if (!found) {
		return null;
	}
	const user = await userRepository.findById(found.userId);
	return { ...found, uid: user?.uid, name: user?.name, url: user?.url }; */
	return db
		.execute<RowDataPacket[]>(`${SELECT_JOIN} WHERE p.id=?`, [id])
		.then((result) => result[0][0]);
}

export async function create(msg: string, userId: number) {
	/* const post: IPost = {
		id: Date.now(),
		msg,
		createdDate: new Date().toJSON(),
		userId,
	};
	posts = [post, ...posts];
	return getById(post.id); */
	return db
		.execute<OkPacket>(
			'INSERT INTO posts (message,createdDate, userId) VALUES (?,?,?)',
			[msg, new Date(), userId]
		)
		.then((result) => getById(result[0].insertId));
}

export async function update(id: number, msg: string) {
	/* const postIndex = posts.findIndex((post) => post.id === Number(id));

	if (postIndex < 0) {
		return { message: `post id(${id}) not found` };
	}

	posts[postIndex].msg = msg;
	return getById(posts[postIndex].id); */
	return db
		.execute<OkPacket>('UPDATE posts SET message=? WHERE id=?', [msg, id])
		.then((result) => getById(id));
}

export async function remove(id: number) {
	/* posts = posts.filter((post) => post.id !== Number(id)); */
	return db.execute('DELETE FROM posts WHERE id=?', [id]);
}
