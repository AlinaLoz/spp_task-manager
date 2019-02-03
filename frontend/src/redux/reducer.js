import {ACTIONS} from "./constans";

const initState = {

};
export default function chatReducer(state = initState, action) {
	switch (action.type) {
		case ACTIONS.USER.LOGIN_RQ:
			return {...state};
		case ACTIONS.USER.LOGIN_SC:
			return {...state};
		case ACTIONS.USER.LOGIN_FL:
			return {...state};
		default:
			return state;
	}
}