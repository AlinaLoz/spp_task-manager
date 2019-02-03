

class Xhr {
	static get(url, ...params) {
		//return fetch(url).then();
	}

	static post(url, ...params) {

	}

	static login(login, password) {
		return this.get('/api/v.1.0/login', login, password);
	}

	static register(login, password) {
		return this.post('/api/v.1.0/register', login, password);
	}
}

export {Xhr};