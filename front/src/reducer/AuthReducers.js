import{
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
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
                userinfo: payload,
            };
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
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
                userinfo: payload,
            };
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};


