import {
    FETCH_PLAT_FAILURE,
    FETCH_PLAT_REQUEST,
    FETCH_PLAT_SUCCESS,
} from "../constant/PlatConstant";

import PlatService from "../service/PlatService";

//fetch plat
export const fetchPlatRequest = () => {
    return {
        type: FETCH_PLAT_REQUEST,
    };
};
 export const fetchPlatSuccess = (plats) => {
    return {
        type: FETCH_PLAT_SUCCESS,
        payload: plats,
    };
}

export const fetchPlatFailure = (error) => {
    return {
        type: FETCH_PLAT_FAILURE,
        payload: error,
    };
};

export const fetchPlatAction = () => {
    return (dispatch) => {
       PlatService.getPlat()
            .then((response) => {
                const plats = response.data;
                dispatch(fetchPlatSuccess(plats));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchPlatFailure(errorMsg));
            });
    };
}