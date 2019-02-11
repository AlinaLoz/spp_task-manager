class Xhr {
	defaultData = {
		optionsGet  : {
			mode   : 'cors',
			method : 'get'
		},
		optionsPost : {
			mode     : 'cors',
			method   : 'post',
			headers  : {
				"Content-type" : "application/json; charset=UTF-8",
			},
		},
		optionsDelete  : {
			mode   : 'cors',
			method : 'delete',
			headers  : {
				"Content-type" : "application/json; charset=UTF-8",
			},
		},
		optionsPut  : {
			mode   : 'cors',
			method : 'put',
			headers  : {
				"Content-type" : "application/json; charset=UTF-8",
			},
		}
	};


	get(url, params) {
		const sendData = Object.keys(params).map(key => `${key}=${params[key]}`);

		return fetch(`${url}?${sendData.join('&')}`, this.defaultData.optionsGet)
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return response.json();
				}
				throw response.statusText
			});
	}

	post(url, body) {
		return fetch(url, {...this.defaultData.optionsPost, body: JSON.stringify(body)})
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return response.json();
				}
				throw response.statusText
			});
	}

	delete(url, body) {
		return fetch(url, {...this.defaultData.optionsDelete, body: JSON.stringify(body)})
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return response.json();
				}
				throw response.statusText
			});
	}

	put(url, body) {
		return fetch(url, {...this.defaultData.optionsPut, body: JSON.stringify(body)})
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

	static getTasks(id) {
		const xhr = new Xhr();
		return xhr.get('http://localhost:8000/api/v1.0/task-get', {id});
	}

	static removeTask(userId, taskId) {
		const xhr = new Xhr();
		return xhr.delete('http://localhost:8000/api/v1.0/task-remove', {userId, taskId});
	}

	static addTask(userId, theme, text) {
		const xhr = new Xhr();
		return xhr.post('http://localhost:8000/api/v1.0/task-add', {userId, theme, text});
	}

	static changeTask(taskId, value) {
		const xhr = new Xhr();
		return xhr.put('http://localhost:8000/api/v1.0/task-change', {taskId, value});
	}
}

export {Xhr};