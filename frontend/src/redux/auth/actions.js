import {ACTIONS} from "../constans";
import {Xhr} from "../../helpers/Xhr";

export const fetchLogin = (login, password) => dispatch => {
	dispatch({type: ACTIONS.USER.LOGIN.RQ});

	Xhr.login(login, password).then(resp => {
		dispatch({
			type: ACTIONS.USER.LOGIN.SC,
			data: resp
		})
	}).catch(err => {
		dispatch({
			type: ACTIONS.USER.LOGIN.FL,
			data: err.data
		})
	});
};


export const fetchAuth = () => dispatch => {
	Xhr.auth().then(resp => {
		dispatch({
			type: ACTIONS.USER.AUTH,
			data: resp
		})
	}).catch(err => {
		console.log(err);
	});
};

export const logOut = () => dispatch => {
	Xhr.logout().then(resp => {
		dispatch({
			type: ACTIONS.USER.LOGOUT,
			data: resp
		})
	}).catch(err => {
		console.log(err);
	});
};


