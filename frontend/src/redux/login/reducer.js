import {ACTIONS} from "../constans";

const initState = {
	message: {}
};

export default function login(state = initState, action) {
	switch (action.type) {
		case ACTIONS.USER.LOGIN.RQ:
			return {...state};
		case ACTIONS.USER.LOGIN.SC:
			localStorage.setItem('auth', action.data.id);
			return {...state, message : {negative: false}};
		case ACTIONS.USER.LOGIN.FL:
			const {data} = action;
			return {...state, message : {negative: true, text: data}};
		default:
			return state;
	}
}