import createDataContext from "./createDataContext";
import { START_LOADING, STOP_LOADING, SHOW_SIDEBAR, HIDE_SIDEBAR } from './actionTypes';

const appReducer = (state, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                loading: true,
            };

        case STOP_LOADING:
            return {
                ...state,
                loading: false,
            };

        case SHOW_SIDEBAR:
            return {
                ...state,
                sidebarActive: true,
            };

        case HIDE_SIDEBAR:
            return {
                ...state,
                sidebarActive: false,
            };

        default:
            return state;
    }
};

const startLoading = dispatch => {
    return () => {
        dispatch({ type: START_LOADING });
    };
};

const stopLoading = dispatch => {
    return () => {
        dispatch({ type: STOP_LOADING });
    };
};

const showSidebar = dispatch => {
    return () => {
        dispatch({ type: SHOW_SIDEBAR });
    };
};

const hideSidebar = dispatch => {
    return () => {
        dispatch({ type: HIDE_SIDEBAR });
    };
};

export const { Context, Provider } = createDataContext(
    appReducer,
    { startLoading, stopLoading, showSidebar, hideSidebar },
    { loading: false, sidebarActive: true }
);