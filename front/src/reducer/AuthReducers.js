import {
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,

} from "../constant/UserConstant";

const storedUser = localStorage.getItem("user");
const initialState = {
    loading: false,
    userinfo: storedUser ? JSON.parse(storedUser) : null,
    error: "",
};
export default function AuthReducer (state = initialState, action){
    const { type, payload } = action;

    switch (type) {
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                userinfo: payload, // Make sure this matches the structure of the user information returned by the API.
            };
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };

        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                userinfo: null,
            };

        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                userinfo: payload, // Make sure this matches the structure of the user information returned by the API.
                error: "",
            };
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };

        // Other cases for register user actions
        default:
            return state;
    }
};
