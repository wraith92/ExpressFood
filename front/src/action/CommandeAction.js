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

import CommandeService from "../service/CommandeService";

//fetch commande
export const fetchCommandeRequest = () => {
    return {
        type: FETCH_COMMANDE_REQUEST,
    };
};

export const fetchCommandeSuccess = (commandes) => {
    return {
        type: FETCH_COMMANDE_SUCCESS,
        payload: commandes,
    };
};

export const fetchCommandeFailure = (error) => {
    return {
        type: FETCH_COMMANDE_FAILURE,
        payload: error,
    };
};

export const fetchCommandeAction = () => {
    return (dispatch) => {
        CommandeService.getCommandes()
            .then((response) => {
                const commandes = response.data;
                dispatch(fetchCommandeSuccess(commandes));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchCommandeFailure(errorMsg));
            });
    };
};

//add commande

export const addCommandeRequest = () => {
    return {
        type: ADD_COMMANDE_REQUEST,
    };
}

export const addCommandeSuccess = (commande) => {
    return {
        type: ADD_COMMANDE_SUCCESS,
        payload: commande,
    };
};

export const addCommandeFailure = (error) => {
    return {
        type: ADD_COMMANDE_FAILURE,
        payload: error,
    };
};


export const addCommandeAction = (commande) => {
    return async (dispatch) => {
        dispatch(addCommandeRequest());
        try {
            const response = await CommandeService.createCommande(commande);
            const commandeData = response.data;
            dispatch(addCommandeSuccess(commandeData));
            return commandeData;
        } catch (error) {
            const errorMsg = error.message;
            dispatch(addCommandeFailure(errorMsg));
            throw error;
        }
    };
};

//update commande

export const updateCommandeRequest = () => {
    return {
        type: UPDATE_COMMANDE_REQUEST,
    };
}

export const updateCommandeSuccess = (commande) => {
    return {
        type: UPDATE_COMMANDE_SUCCESS,
        payload: commande,
    };
}

export const updateCommandeFailure = (error) => {
    return {
        type: UPDATE_COMMANDE_FAILURE,
        payload: error,
    };
}

export const updateCommandeAction = (id,commande) => {
    return async (dispatch) => {
        dispatch(updateCommandeRequest());
        try {
            const response = await CommandeService.updateCommande( id,commande);
            const commandeData = response.data;
            dispatch(updateCommandeSuccess(commandeData));
            return commandeData;
        } catch (error) {
            const errorMsg = error.message;
            dispatch(updateCommandeFailure(errorMsg));
            throw error;
        }
    };
}

//delete commande

export const deleteCommandeRequest = () => {
    return {
        type: DELETE_COMMANDE_REQUEST,
    };
}
export const deleteCommandeSuccess = (commande) => {
    return {
        type: DELETE_COMMANDE_SUCCESS,
        payload: commande,
    };
}
export const deleteCommandeFailure = (error) => {
    return {
        type: DELETE_COMMANDE_FAILURE,
        payload: error,
    };
}

export const deleteCommandeAction = (commande) => {
    return async (dispatch) => {
        dispatch(deleteCommandeRequest());
        try {
            const response = await CommandeService.deleteCommande(commande);
            const commandeData = response.data;
            dispatch(deleteCommandeSuccess(commandeData));
            return commandeData;
        } catch (error) {
            const errorMsg = error.message;
            dispatch(deleteCommandeFailure(errorMsg));
            throw error;
        }
    };
}
