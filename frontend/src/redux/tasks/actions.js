import {ACTIONS} from "../constans";
import {Xhr} from "../../helpers/Xhr";

export const getTasks = () => dispatch => {
	dispatch({type: ACTIONS.TASK.GET.RQ});

	Xhr.getTasks(localStorage.getItem('auth')).then(resp => {
		dispatch({
			type: ACTIONS.TASK.GET.SC,
			data: resp.data
		})
	}).catch(err => {
		dispatch({
			type: ACTIONS.TASK.GET.FL,
			data: err
		})
	});
};


export const deleteTask = (taskId) => dispatch => {
	dispatch({type: ACTIONS.TASK.REMOVE.RQ});

	Xhr.removeTask(localStorage.getItem('auth'), taskId).then(resp => {
		dispatch({
			type: ACTIONS.TASK.REMOVE.SC,
			data: resp.data
		})
	}).catch(err => {
		dispatch({
			type: ACTIONS.TASK.REMOVE.FL,
			data: err
		})
	});
};

export const addTask = (theme, text) => dispatch => {
	dispatch({type: ACTIONS.TASK.ADD.RQ});
	Xhr.addTask(localStorage.getItem('auth'), theme, text).then(resp => {
		dispatch({
			type: ACTIONS.TASK.ADD.SC,
			data: resp.data
		})
	}).catch(err => {
		dispatch({
			type: ACTIONS.TASK.ADD.FL,
			data: err
		})
	});
};

export const changeTask = (taskId, value) => dispatch => {
	dispatch({type: ACTIONS.TASK.CHANGE.RQ});

	Xhr.changeTask(taskId, value).then(resp => {
		dispatch({
			type: ACTIONS.TASK.CHANGE.SC,
			data: resp.data
		})
	}).catch(err => {
		dispatch({
			type: ACTIONS.TASK.CHANGE.FL,
			data: err
		})
	});
};

export const removeMessage = () => dispatch => {
	dispatch({
		type:  ACTIONS.TASK.REMOVE_MESSAGE.SC
	});
};