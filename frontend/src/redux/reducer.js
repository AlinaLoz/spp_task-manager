import login from "./login/reducer";
import register from "./register/reducer";
import tasks from "./tasks/reducer";
import {combineReducers} from "redux";

export default combineReducers({
	login,
	register,
	tasks,
});