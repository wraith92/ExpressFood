import {
    FETCH_PLAT_FAILURE,
    FETCH_PLAT_REQUEST,
    FETCH_PLAT_SUCCESS,
} from "../constant/PlatConstant";

const initialState = {
    loading: false,
    plats: [],
    error: "",
};

const PlatReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLAT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_PLAT_SUCCESS:
            return {
                loading: false,
                plats: action.payload,
                error: "",
            };
        case FETCH_PLAT_FAILURE:
            return {
                loading: false,
                plats: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default PlatReducer;
