import { ROOT_URL, CATEGORIES } from '../constants/url';
import * as types from '../constants/ActionTypes';
import { AUTHORIZATION_HEADERS } from './constants';

export function fetchAllCategories() {
    return dispatch => {
        return fetch(
            ROOT_URL + CATEGORIES,
            {
                headers: AUTHORIZATION_HEADERS
            }
        ).then(response => response.json())
        .then(result => {
            dispatch({
                type: types.FETCH_ALL_CATEGORIES,
                result
            })
        })
    }
}