import {ACTIONS} from "../constans";

const initState = {
	message: {},
	auth: false,
	token: null
};

export default function auth(state = initState, action) {
	switch (action.type) {
		case ACTIONS.USER.LOGOUT:
			localStorage.setItem('auth', "false");
			localStorage.removeItem('token');
			return {...state, auth: false, token: ""};
		case ACTIONS.USER.AUTH: {
			const {auth} = action.data;
			localStorage.setItem('auth', auth);
			return {...state, auth};
		}
		case ACTIONS.USER.LOGIN.RQ:
			return {...state};
		case ACTIONS.USER.LOGIN.SC:
			const {token, auth} = action.data;
			localStorage.setItem('token', token);
			localStorage.setItem('auth', 'true');
			return {...state, token, auth, message : {negative: false}};
		case ACTIONS.USER.LOGIN.FL:
			const {data} = action;
			localStorage.removeItem('token');
			localStorage.setItem('auth', "false");
			return {...state, auth: false, message : {negative: true, text: data.message}};
		default:
			return state;
	}
}