import createDataContext from "./createDataContext";
import { SET_PROJECTS } from './actionTypes';

const projectReducer = (state, action) => {
    switch (action.type) {
        case SET_PROJECTS:
            return {
                ...state,
                topProjects: action.payload.topProjects,
                recentProjects: action.payload.recentProjects,
            };

        default:
            return state;
    }
};

const setProjects = dispatch => {
    return data => {
        if (data) {
            return dispatch({ type: SET_PROJECTS, payload: data });
        }
        dispatch({ type: SET_PROJECTS, payload: {topProjects: null, recentProjects: null} });
    };
};

export const { Context, Provider } = createDataContext(
    projectReducer,
    { setProjects },
    { topProjects: {}, recentProjects: {} }
);