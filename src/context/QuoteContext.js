import createDataContext from "./createDataContext";
import { SET_QUOTES } from "./actionTypes";

const quoteReducer = (state, action) => {
    switch (action.type) {
        case SET_QUOTES:
            return {
                ...state,
                quotes: action.payload,
            };

        default:
            return state;
    }
};

const setQuotes = dispatch => {
    return data => {
        if (data) {
            return dispatch({ type: SET_QUOTES, payload: data });
        }
        dispatch({ type: SET_QUOTES, payload: null });
    };
};

export const { Context, Provider } = createDataContext(
    quoteReducer,
    { setQuotes },
    { quotes: null }
);