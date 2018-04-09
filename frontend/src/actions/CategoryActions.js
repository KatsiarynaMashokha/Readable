import { ROOT_URL, CATEGORIES, POSTS } from '../constants/constants';
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
        .then(result => 
            dispatch({
                type: types.FETCH_ALL_CATEGORIES,
                result
            })
        )
    }
}

export function fetchPostsForCategory(category) {
    return dispatch => {
        return fetch(
            ROOT_URL + '/' + category + POSTS,
            {
                headers: AUTHORIZATION_HEADERS
            }
        ).then(response => response.json())
        .then(result => {
            dispatch({
                type: types.FETCH_POSTS_FOR_CATEGORY,
                result
            })
        })
    }
}