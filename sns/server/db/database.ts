import mysql from 'mysql2';
import { config } from '../config';

// 데이터베이스와 연결을 맺고 있는 connection 객체를 관리
const pool = mysql.createPool({
	host: config.db.host,
	user: config.db.user,
	database: config.db.database,
	password: config.db.password,
});

export const db = pool.promise();
