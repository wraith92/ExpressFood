import {
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_USER_REQUEST,
    UPDATE_USER_FAILURE,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_REQUEST,
    DELETE_USER_FAILURE ,
    DELETE_USER_SUCCESS,
    DELETE_USER_REQUEST,
    ADD_USER_FAILURE,
    ADD_USER_SUCCESS,
    ADD_USER_REQUEST,

} from "../constant/UserConstant";

const initialState = {
    loading: false,
    users: [],
    error: "",
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                data: {
                    users: action.payload,
                },
                error: "",
            };
        case FETCH_USER_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            };
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: "",
            };
        case UPDATE_USER_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            };
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: "",
            };
        case DELETE_USER_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            };
        case ADD_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: "",
            };
        case ADD_USER_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            };

        default:
            return state;
    }
};

export default UserReducer;