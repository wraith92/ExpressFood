import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,

} from "../constant/UserConstant";

import UserService from "../service/Authservice";

//login user
export const loginUserRequest = () => {
    return {
        type: LOGIN_USER_REQUEST,
    };
};
 export const loginUserSuccess = (user) => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: user,
    };
}

export const loginUserFailure = (error) => {
    return {
        type: LOGIN_USER_FAILURE,
        payload: error,
    };
};
export const loginUserAction = (user) => {
    return async (dispatch) => {
        dispatch(loginUserRequest());
        try {
            const response = await UserService.login(user);
            const userData = response.data;
            dispatch(loginUserSuccess(userData));
            return userData;
        } catch (error) {
            const errorMsg = error.message;
            dispatch(loginUserFailure(errorMsg));
            throw error;
        }
    };
};



//register user

export const registerUserRequest = () => {
    return {
        type: REGISTER_USER_REQUEST,
    };
}
export const registerUserSuccess = (user) => {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: user,
    };
}

export const registerUserFailure = (error) => {
    return {
        type: REGISTER_USER_FAILURE,
        payload: error,
    };
};

export const registerUserAction = (user) => {
    return (dispatch) => {
        UserService.register(user)
            .then((response) => {
                const user = response.data;
                dispatch(registerUserSuccess(user));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(registerUserFailure(errorMsg));
            });
    };
}

//logout user
export const logoutUserAction = () => {
    return (dispatch) => {
        UserService.logout();
        dispatch({ type: 'LOGOUT_USER_SUCCESS' });
    };
}
