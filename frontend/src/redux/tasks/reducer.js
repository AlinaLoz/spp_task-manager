import {ACTIONS} from "../constans";

const defaultState = {
	tasks: [],
	message: {}
};

export default function tasks(state = defaultState, action) {
	switch (action.type) {
		case ACTIONS.TASK.GET.RQ:
			return {...state};
		case ACTIONS.TASK.GET.SC:
			return {...state, tasks: [...action.data]};
		case ACTIONS.TASK.GET.FL:
			return {...state};

		case ACTIONS.TASK.ADD.RQ:
			return {...state};
		case ACTIONS.TASK.ADD.SC:
			return {...state, message: {negative: false}};
		case ACTIONS.TASK.ADD.FL:
			return {...state, message: {negative: true, text: action.error}};


		case ACTIONS.TASK.CHANGE.RQ:
			return {...state};
		case ACTIONS.TASK.CHANGE.SC:
			return {...state, message: {negative: false}};
		case ACTIONS.TASK.CHANGE.FL:
			return {...state, message: {negative: true, text: action.error}};


		case ACTIONS.TASK.REMOVE.RQ:
			return {...state};
		case ACTIONS.TASK.REMOVE.SC:
			return {...state, message: {negative: false}};
		case ACTIONS.TASK.REMOVE.FL:
			return {...state, message: {negative: true, text: action.error}};

		case ACTIONS.TASK.REMOVE_MESSAGE.SC:
			return {...state, message: {}};
		default:
			return state;
	}
}