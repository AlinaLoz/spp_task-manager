import {ACTIONS} from "./constans";
import {Xhr} from "../helpers/Xhr";

export const fetchLogin = (login, password) => dispatch => {
	dispatch({type: ACTIONS.USER.LOGIN_RQ});

	Xhr.login(login, password).then(resp => {
		dispatch({
			type: ACTIONS.USER.LOGIN_SC,
			data: resp.data
		})
	}).catch(err => {
		dispatch({
			type: ACTIONS.USER.LOGIN_FL,
			data: err.message
		})
	});
};