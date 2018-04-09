import { ROOT_URL, POSTS } from '../constants/constants';
import * as types from '../constants/ActionTypes';
import { AUTHORIZATION_HEADERS } from './constants';

export function fetchAllPosts() {
    return dispatch => {
        return fetch(
            ROOT_URL + POSTS,
            {
                headers: AUTHORIZATION_HEADERS
            }
        ).then(response => response.json())
        .then(result => {
            dispatch({
                type: types.FETCH_ALL_POSTS,
                result
            })
        })
    }
}

