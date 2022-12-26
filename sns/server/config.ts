import dotenv from 'dotenv';
dotenv.config();

function required<T>(key: string, defaultValue: T) {
	const value = process.env[key] || defaultValue;
	if (value == null) {
		throw new Error(`key(${key}) is undefined`);
	}
	return value;
}

export const config = {
	jwt: {
		secretKey: required('JWT_KEY', ''),
		expiresInSec: required('JWT_EXPIRES_SEC', 86400000),
	},
	bcrypt: {
		saltRounds: required('BCRYPT_SALT_ROUNDS', 12),
	},
	host: {
		port: required('HOST_PORT', 8080),
	},
	db: {
		host: required('DB_HOST', 'localhost'),
		port: required('DB_PORT', 3306),
		user: required('DB_USER', 'root'),
		database: required('DB_DATABASE', ''),
		password: required('DB_PASSWORD', ''),
	},
};
