import {ACTIONS} from "../constans";

const initState = {
    teams: [],
    infoTeams: {},
    userTest: null,
    fetchingUserTest: false,
    messageOfDrop  : {},
    messageOfCreate: {},
    fetchCreateTeam: false
};

export default function teams(state = initState, action) {
    switch (action.type) {
        case ACTIONS.TEAM.USER_TEST.RQ:
            return {...state, fetchingUserTest: true};
        case ACTIONS.TEAM.USER_TEST.SC:
            return {...state, userTest: {...action.data}};
        case ACTIONS.TEAM.USER_TEST.FL:
            return {...state, userTest: false, fetchingUserTest: false};

        case ACTIONS.TEAM.GET.SC:
            return {...state, teams: [...action.data]};

        case ACTIONS.TEAM.DROP.SC:
            const {id, message} = action.data;
            const teams = state.teams.filter(team => team.id != id);
            return {...state, teams, messageOfDrop: {positive: true, info: message}};
        case ACTIONS.TEAM.DROP.FL:
            return {...state, messageOfDrop: {positive: false, info: action.data.message}};

        case ACTIONS.TEAM.MESSAGE:
            return {...state, messageOfDrop: {}, messageOfCreate: {}};

        case ACTIONS.TEAM.CREATE.RQ:
            return {...state, fetchCreateTeam: true};
        case ACTIONS.TEAM.CREATE.SC:
            return {...state, fetchCreateTeam: false, messageOfCreate: {positive: true, info: action.data.message}};
        case ACTIONS.TEAM.CREATE.FL:
            return {...state, fetchCreateTeam: false, messageOfCreate: {positive: false, info: "bad request"}};

        case ACTIONS.ONE_TEAM.GET.SC:{
            const {id, data} = action;
            const {infoTeams} = state;
            return {...state, infoTeams: {...infoTeams, [id]: data}};
        }

        case ACTIONS.ONE_TEAM.UPDATE_NAME.SC:{
            return {...state, messageOfCreate: {positive: true, info: action.data.message}};
        }
        case ACTIONS.ONE_TEAM.UPDATE_NAME.FL:{
            return {...state, messageOfCreate: {positive: false, info: "bad request"}};
        }
        default:
            return state;
    }
}