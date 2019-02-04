import {ACTIONS} from "../constans";

const initState = {
	message: {}
};

export default function register(state = initState, action) {
	switch (action.type) {
		case ACTIONS.USER.REGISTER.RQ:
			return {...state};
		case ACTIONS.USER.REGISTER.SC:
			console.log('success');
			return {...state, ...action.data, message : {negative: false}};
		case ACTIONS.USER.REGISTER.FL:
			const {data} = action;
			console.log('failure');
			return {...state, message : {negative: true, text: data}};
		default:
			return state;
	}
}