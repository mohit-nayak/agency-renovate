import createDataContext from './createDataContext';
import { SIGN_IN, SIGN_OUT, SET_ERROR, RESET_ERROR } from './actionTypes';
import { auth } from '../config/firebase';
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

        case SET_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
            }

        case RESET_ERROR:
            return {
                ...state,
                errorMessage: '',
            }

        default:
            return state;
    }
};

const checkAuth = dispatch => {
    return (callback) => {
        auth().onAuthStateChanged(function(user) {
            if (user) {
                dispatch({ type: SIGN_IN, payload: user });
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
            console.log("signed in", response.user)
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

export const { Context, Provider } = createDataContext(
    authReducer,
    { checkAuth, signIn, signOut },
    { authenticated: null, user: null, errorMessage: '' },
);