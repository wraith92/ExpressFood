import{
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    DELETE_USER_REQUEST,
    ADD_USER_FAILURE,
    ADD_USER_SUCCESS,
    ADD_USER_REQUEST,
} from "../constant/UserConstant";

import UserService from "../service/UserService";

//fetch user
export const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST,
    };
};
export const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users,
    };
};
export const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error,
    };
};

export const fetchUserAction = () => {
    return (dispatch) => {
        UserService.getUsers()
            .then((response) => {
                const users = response.data;
                dispatch(fetchUserSuccess(users));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchUserFailure(errorMsg));
            });
    };
}

//add user

export const addUserRequest = () => {
    return {
        type: ADD_USER_REQUEST,
    };
}
export const addUserSuccess = (user) => {
    return {
        type: ADD_USER_SUCCESS,
        payload: user,
    };
}
export const addUserFailure = (error) => {
    return {
        type: ADD_USER_FAILURE,
        payload: error,
    };
}

export const addUserAction = (user) => {
    return async (dispatch) => {
        dispatch(addUserRequest());
        try {
            const response = await UserService.createUser(user);
            const userData = response.data;
            dispatch(addUserSuccess(userData));
            return userData;
        } catch (error) {
            const errorMsg = error.message;
            dispatch(addUserFailure(errorMsg));
            throw error;
        }
    };
}

//update user

export const updateUserRequest = () => {
    return {
        type: UPDATE_USER_REQUEST,
    };
}
export const updateUserSuccess = (user) => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: user,
    };
}
export const updateUserFailure = (error) => {
    return {
        type: UPDATE_USER_FAILURE,
        payload: error,
    };
}

export const updateUserAction = (id , user) => {
    return async (dispatch) => {
        dispatch(updateUserRequest());
        try {
            const response = await UserService.updateUser(id, user);
            const userData = response.data;
            dispatch(updateUserSuccess(userData));
            return userData;
        } catch (error) {
            const errorMsg = error.message;
            dispatch(updateUserFailure(errorMsg));
            throw error;
        }
    };
}

//delete user

export const deleteUserRequest = () => {
    return {
        type: DELETE_USER_REQUEST,
    };
}
export const deleteUserSuccess = (user) => {
    return {
        type: DELETE_USER_SUCCESS,
        payload: user,
    };
}
export const deleteUserFailure = (error) => {
    return {
        type: DELETE_USER_FAILURE,
        payload: error,
    };
}

export const deleteUserAction = (user) => {
    return async (dispatch) => {
        dispatch(deleteUserRequest());
        try {
            const response = await UserService.deleteUser(user);
            const userData = response.data;
            dispatch(deleteUserSuccess(userData));
            return userData;
        } catch (error) {
            const errorMsg = error.message;
            dispatch(deleteUserFailure(errorMsg));
            throw error;
        }
    };
}

//livreur proch

export const livreurProchRequest = () => {
    return {
        type: FETCH_USER_REQUEST,
    };
}
export const livreurProchSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users,
    };
}
export const livreurProchFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error,
    };
}


export const livreurProchAction = () => {
    return (dispatch) => {
        UserService.livreurProche()
            .then((response) => {
                const users = response.data;
                dispatch(livreurProchSuccess(users));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(livreurProchFailure(errorMsg));
            });
    };
}
