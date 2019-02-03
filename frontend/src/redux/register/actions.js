import {ACTIONS} from "../constans";
import {Xhr} from "../../helpers/Xhr";

export const fetchRegister = (login, password, confirmPassword) => dispatch => {
	dispatch({type: ACTIONS.USER.REGISTER.RQ});

	Xhr.register(login, password,confirmPassword).then(resp => {
		dispatch({
			type: ACTIONS.USER.REGISTER.SC,
			data: resp.data
		})
	}).catch(err => {
		dispatch({
			type: ACTIONS.USER.REGISTER.FL,
			data: err
		})
	});
};