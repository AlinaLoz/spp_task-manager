class Xhr {
	headers = {
		"Accept": "application/json",
		"Content-Type":"application/json",
		"mode"     : "no-cors",
	};

	get(url, params) {
		const sendData = Object.keys(params).map(key => `${key}=${params[key]}`);

		return fetch(`${url}?${sendData.join('&')}`, {...this.headers, method: "GET"})
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return response.json();
				}
				throw response.statusText
			});
	}

	post(url, body) {
		return fetch(url, {...this.headers, method: "POST", body: JSON.stringify(body)})
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return response.json();
				}
				throw response.statusText
			});
	}

	static login(login, password) {
		const xhr = new Xhr();
		return xhr.get('http://localhost:8000/api/v1.0/login', {login, password});
	}

	static register(login, password, confirmPassword) {
		const xhr = new Xhr();
		return xhr.post('http://localhost:8000/api/v1.0/register', {login, password, confirmPassword});
	}
}

export {Xhr};