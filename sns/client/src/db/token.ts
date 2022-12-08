const TOKEN = 'token';

export default class TokenStorage {
	saveToken(token: string) {
		localStorage.setItem(TOKEN, token);
	}

	getToken() {
		return localStorage.getItem(TOKEN);
	}

	clearToken() {
		localStorage.removeItem(TOKEN);
	}
}

/*
	보안상 브라우저 로컬스토리지에 저장하는 것은 좋지 않지만
	현재 프로젝트에는 DB가 아직 붙지 않았기 때문에
	우선 로컬스토리지 이용
*/
