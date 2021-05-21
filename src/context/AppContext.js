import createDataContext from "./createDataContext";
import {
    START_APP_LOADING,
    STOP_APP_LOADING,
    START_AUTH_LOADING,
    STOP_AUTH_LOADING,
    SHOW_SIDEBAR,
    HIDE_SIDEBAR
} from './actionTypes';

const appReducer = (state, action) => {
    switch (action.type) {
        case START_APP_LOADING:
            return {
                ...state,
                loading: true,
            };

        case STOP_APP_LOADING:
            return {
                ...state,
                loading: false,
            };

        case START_AUTH_LOADING:
            return {
                ...state,
                authLoading: true,
            };

        case STOP_AUTH_LOADING:
            return {
                ...state,
                authLoading: false,
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
        dispatch({ type: START_APP_LOADING });
    };
};

const stopLoading = dispatch => {
    return () => {
        dispatch({ type: STOP_APP_LOADING });
    };
};

const startAuthLoading = dispatch => {
    return () => {
        dispatch({ type: START_AUTH_LOADING });
    };
};

const stopAuthLoading = dispatch => {
    return () => {
        dispatch({ type: STOP_AUTH_LOADING });
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
    {
        startLoading,
        stopLoading,
        startAuthLoading,
        stopAuthLoading,
        showSidebar,
        hideSidebar
    },
    { loading: false, authLoading: false, sidebarActive: false }
);