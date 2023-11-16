import {
    FETCH_COMMANDE_FAILURE,
    FETCH_COMMANDE_REQUEST,
    FETCH_COMMANDE_SUCCESS,
    UPDATE_COMMANDE_FAILURE,
    UPDATE_COMMANDE_REQUEST,
    UPDATE_COMMANDE_SUCCESS,
    DELETE_COMMANDE_FAILURE,
    DELETE_COMMANDE_REQUEST,
    DELETE_COMMANDE_SUCCESS,
    ADD_COMMANDE_FAILURE,
    ADD_COMMANDE_REQUEST,
    ADD_COMMANDE_SUCCESS,
} from "../constant/CommandeConstant";

const initialState = {
    loading: false,
    commandes: [],
    error: "",
};

const CommandeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMANDE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_COMMANDE_SUCCESS:
            return {
                loading: false,
                data: {
                    commandes: action.payload,
                },
                error: "",
            };
        case FETCH_COMMANDE_FAILURE:
            return {
                loading: false,
                data: {
                    commandes: [],
                },
                error: action.payload,
            };
        case UPDATE_COMMANDE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_COMMANDE_SUCCESS:
            return {
                loading: false,
                data: {
                    commandes: action.payload,
                },
                error: "",
            };
        case UPDATE_COMMANDE_FAILURE:
            return {
                loading: false,
                data: {
                    commandes: [],
                },
                error: action.payload,
            };
        case DELETE_COMMANDE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_COMMANDE_SUCCESS:
            return {
                loading: false,
                data: {
                    commandes: action.payload,
                },
                error: "",
            };
        case DELETE_COMMANDE_FAILURE:
            return {
                loading: false,
                data: {
                    commandes: [],
                },
                error: action.payload,
            };
        case ADD_COMMANDE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_COMMANDE_SUCCESS:
            return {
                loading: false,
                data: {
                    commandes: action.payload,
                },
                error: "",
            };
        case ADD_COMMANDE_FAILURE:
            return {
                loading: false,
                data: {
                    commandes: [],
                },
                error: action.payload,
            };
        default:
            return state;
    }
}

export default CommandeReducer;