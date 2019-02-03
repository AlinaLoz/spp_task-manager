import login from "./login/reducer";
import register from "./register/reducer";
import {combineReducers} from "redux";

export default combineReducers({
	login,
	register
});