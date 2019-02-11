import {ACTIONS} from "../constans";

const initState = {
	message: {},
	auth: false,
	token: null
};

export default function auth(state = initState, action) {
	switch (action.type) {
		case ACTIONS.USER.LOGIN.RQ:
			return {...state};
		case ACTIONS.USER.LOGIN.SC:
			const {token, auth} = action.data;
			localStorage.setItem('token', token);
			return {...state, token, auth, message : {negative: false}};
		case ACTIONS.USER.LOGIN.FL:
			const {data} = action;
			localStorage.removeItem('token');
			return {...state, auth: false, message : {negative: true, text: data}};
		default:
			return state;
	}
}