import {ACTIONS} from "../constans";

const initState = {
	message: {},
};

export default function register(state = initState, action) {
	switch (action.type) {
		case ACTIONS.USER.REGISTER.RQ:
			return {...state};
		case ACTIONS.USER.REGISTER.SC:
			return {...state, message : {negative: false, text: "" }};
		case ACTIONS.USER.REGISTER.FL:
			const {data} = action;
			return {...state, message : {negative: true, text: data}};
		default:
			return state;
	}
}