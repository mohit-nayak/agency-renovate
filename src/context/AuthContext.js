import createDataContext from './createDataContext';
import {
    SIGN_IN,
    SIGN_OUT,
    SET_SUPER_ADMIN,
    SET_ERROR,
    RESET_ERROR ,
    SET_CREATE_USER_ERROR,
    RESET_CREATE_USER_ERROR,
    CREATE_USER_SUCCESS,
    CREATE_USER_SUCCESS_RESET,
} from './actionTypes';
import { auth, secondaryApp } from '../config/firebase';
import { getDataAt } from "../api/firebase";
import { getErrorMessage } from '../utility/functions';

const authReducer = (state, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                authenticated: true,
                user: action.payload,
                errorMessage: '',
            };

        case SIGN_OUT:
            return {
                ...state,
                authenticated: false,
                user: null,
            };

        case SET_SUPER_ADMIN:
            return {
                ...state,
                isSuperAdmin: action.payload,
            };

        case SET_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
            };

        case RESET_ERROR:
            return {
                ...state,
                errorMessage: '',
            };

        case SET_CREATE_USER_ERROR:
            return {
                ...state,
                createUserErrorMessage: action.payload,
            };

        case RESET_CREATE_USER_ERROR:
            return {
                ...state,
                createUserErrorMessage: '',
            };

        case CREATE_USER_SUCCESS:
            return {
                ...state,
                createUserSuccess: true,
            };

        case CREATE_USER_SUCCESS_RESET:
            return {
                ...state,
                createUserSuccess: false,
            };

        default:
            return state;
    }
};

const checkAuth = dispatch => {
    return (callback) => {
        auth().onAuthStateChanged(function(user) {
            if (user) {
                // Check if the user is super admin.
                getDataAt('superAdmin')
                    .then(res => {
                        dispatch({ type: SET_SUPER_ADMIN, payload: !!(res && user.email === res) });
                        dispatch({ type: SIGN_IN, payload: user });
                    });
            } else {
                dispatch({ type: SIGN_OUT });
            }

            if (callback) {
                callback();
            }
        });
    };
};

const signIn = dispatch => {
    return async (email, password, callback) => {
        try {
            const response = await auth().signInWithEmailAndPassword(email, password);
            dispatch({ type: SIGN_IN, payload: response.user });
            dispatch({ type: RESET_ERROR });
        }
        catch (err) {
            dispatch({ type: SET_ERROR, payload: getErrorMessage(err.code) });
        }

        if (callback) {
            callback();
        }
    }
};

const signOut = dispatch => {
    return async () => {
        try {
            await auth().signOut();
            dispatch({ type: SIGN_OUT });
        }
        catch (err) {
            dispatch({ type: SET_ERROR, payload: getErrorMessage(err.code) });
        }
    };
};

const createUser = dispatch => {
    return async (email, password, isSuperAdmin, callback) => {
        dispatch({ type: CREATE_USER_SUCCESS_RESET });

        if (isSuperAdmin) {
            try {
                await secondaryApp.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => {
                        secondaryApp.auth().signOut();
                        dispatch({ type: CREATE_USER_SUCCESS });
                        dispatch({ type: RESET_CREATE_USER_ERROR });
                    });
            }
            catch (err) {
                dispatch({ type: SET_CREATE_USER_ERROR, payload: err.message });
            }
        }
        else {
            dispatch({ type: SET_CREATE_USER_ERROR, payload: "Only super admins are allowed to create new admin." });
        }

        if (callback) {
            callback();
        }
    };
};

export const { Context, Provider } = createDataContext(
    authReducer,
    { checkAuth, signIn, signOut, createUser },
    {
        authenticated: null,
        user: null,
        isSuperAdmin: false,
        errorMessage: '',
        createUserErrorMessage: '' ,
        createUserSuccess: false,
    },
);