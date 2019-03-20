const URL = 'http://localhost:8000/api/v1.0';

class Xhr {
	defaultData = {
		optionsGet  : {
			mode   : 'cors',
			method : 'get',
			headers: {
				"Content-Type" : "application/json; charset=UTF-8",
			}
		},
		optionsPost : {
			mode     : 'cors',
			method   : 'post',
			headers  : {
				"Content-Type" : "application/json; charset=UTF-8",
			},
		},
		optionsDelete  : {
			mode   : 'cors',
			method : 'delete',
			headers  : {
				"Content-Type" : "application/json; charset=UTF-8",
			},
		},
		optionsPut  : {
			mode   : 'cors',
			method : 'put',
			headers  : {
				"Content-Type" : "application/json; charset=UTF-8",
			},
		}
	};


	get(url, params) {
		const sendData = Object.keys(params).map(key => `${key}=${params[key]}`);

		return fetch(`${url}?${sendData.join('&')}&token=${localStorage.getItem('token')}`, this.defaultData.optionsGet)
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return response.json();
				}
				return response.json().then(err => {throw err;});
			});
	}

	post(url, body) {
		return fetch(`${url}?token=${localStorage.getItem('token')}`, {...this.defaultData.optionsPost, body: JSON.stringify(body)})
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return response.json();
				}

				return response.json().then(err => {throw err;});
			});
	}

	delete(url, body) {
		return fetch(`${url}?token=${localStorage.getItem('token')}`, {...this.defaultData.optionsDelete, body: JSON.stringify(body)})
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return response.json();
				}
				throw response.statusText
			});
	}

	put(url, body) {
		return fetch(`${url}?token=${localStorage.getItem('token')}`, {...this.defaultData.optionsPut, body: JSON.stringify(body)})
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					return response.json();
				}
				throw response.statusText
			});
	}

	static login(login, password) {
		const xhr = new Xhr();
		return xhr.get(`${URL}/login`, {login, password});
	}

    static auth() {
        const xhr = new Xhr();
        return xhr.get(`${URL}/auth`, {});
    }

	static register(login, password, confirmPassword) {
		const xhr = new Xhr();
		return xhr.post(`${URL}/register`, {login, password, confirmPassword});
	}

	static getTasks(id) {
		const xhr = new Xhr();
		return xhr.get(`${URL}/task-get`, {id});
	}

	static removeTask(userId, taskId) {
		const xhr = new Xhr();
		return xhr.delete(`${URL}/task-remove`, {userId, taskId});
	}

	static addTask(userId, theme, text) {
		const xhr = new Xhr();
		return xhr.post(`${URL}/task-add`, {userId, theme, text});
	}

	static changeTask(taskId, value) {
		const xhr = new Xhr();
		return xhr.put(`${URL}/task-change`, {taskId, value});
	}

	static getTeams() {
		const xhr = new Xhr();
		return xhr.get(`${URL}/team`, {});
	}

	static checkExistUser(login) {
		const xhr = new Xhr();
		return xhr.get(`${URL}/user/check`, {login});
	}

	static createTeam(name, users) {
		const xhr = new Xhr();
		return xhr.post(`${URL}/team/add`, {name, users});
	}

	static dropTeam(id) {
		const xhr = new Xhr();
		return xhr.delete(`${URL}/team/drop`, {id});
	}

	static logout() {
		const xhr = new Xhr();
		return xhr.get(`${URL}/logout`, {});
	}

    static getOneTeam(id) {
        const xhr = new Xhr();
        return xhr.get(`${URL}/team/${id}`, {id});
    }

    static updateNameTeam(id, name) {
        const xhr = new Xhr();
        return xhr.put(`${URL}/team/update`, {id, name});
    }
}

export {Xhr};