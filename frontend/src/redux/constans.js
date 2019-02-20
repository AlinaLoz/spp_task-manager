export const ACTIONS = {
	USER: {
		AUTH   : "AUTH",
		LOGOUT : "LOGOUT",
		LOGIN: {
			RQ: "LOGIN_RQ",
			SC: "LOGIN_SC",
			FL: "LOGIN_FL"
		},
		REGISTER: {
			RQ: "REGISTER_RQ",
			SC: "REGISTER_SC",
			FL: "REGISTER_FL"
		}
	},
	ONE_TEAM: {
		GET: {
			RQ: "ONE_TEAM_GET_RQ",
			SC: "ONE_TEAM_GET_SC",
			FL: "ONE_TEAM_GET_FL"
		},
		UPDATE_NAME: {
			RQ: "UPDATE_NAME_RQ",
			SC: "UPDATE_NAME_SC",
			FL: "UPDATE_NAME_FL"
		}
	},
	TEAM: {
		MESSAGE: "MESSAGE",
		DROP: {
			RQ: "TEAM_DROP_RQ",
			SC: "TEAM_DROP_SC",
			FL: "TEAM_DROP_FL"
		},
		CREATE: {
			RQ: "TEAM_CREATE_RQ",
			SC: "TEAM_CREATE_SC",
			FL: "TEAM_CREATE_FL"
		},
		GET: {
			RQ: "TEAM_GET_RQ",
			SC: "TEAM_GET_SC",
			FL: "TEAM_GET_FL"
		},
		USER_TEST: {
			RQ: "USER_TEST_RQ",
			SC: "USER_TEST_SC",
			FL: "USER_TEST_FL"
		}
	},
	TASK: {
		GET: {
			RQ: "GET_RQ",
			SC: "GET_SC",
			FL: "GET_FL"
		},
		ADD: {
			RQ: "ADD_RQ",
			SC: "ADD_SC",
			FL: "ADD_FL"
		},
		REMOVE: {
			RQ: "REMOVE_RQ",
			SC: "REMOVE_SC",
			FL: "REMOVE_FL"
		},
		CHANGE: {
			RQ: "CHANGE_RQ",
			SC: "CHANGE_SC",
			FL: "CHANGE_FL"
		},
		REMOVE_MESSAGE: {
			RQ: "REMOVE_MESSAGE_RQ",
			SC: "REMOVE_MESSAGE_SC",
			FL: "REMOVE_MESSAGE_FL"
		}
	}
};