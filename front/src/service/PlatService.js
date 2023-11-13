import axios from 'axios';

const API_URL = 'http://localhost:8080/api/plats/';

export const fetchPlat = () => {
    return (dispatch) => {
        dispatch(fetchPlatRequest());
        axios
            .get(API_URL)
            .then((response) => {
                const plats = response.data;
                dispatch(fetchPlatSuccess(plats));
            })
            .catch((error) => {
                dispatch(fetchPlatFailure(error.message));
            });
    };
};