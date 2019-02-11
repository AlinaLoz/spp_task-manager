import auth from "./login/reducer";
import register from "./register/reducer";
import {combineReducers} from "redux";
import tasks from "./tasks/reducer";

export default combineReducers({
	auth,
	register,
	tasks,
});