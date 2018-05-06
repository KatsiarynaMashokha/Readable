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

export function createNewPost(post) {
    return dispatch => {
        return fetch(
            ROOT_URL + POSTS,
            {
                method: 'POST',
                headers: AUTHORIZATION_HEADERS,
                body: JSON.stringify(post)
            }  
        ).then(response => response.json())
        .then(result => {
            dispatch({
                type: types.CREATE_NEW_POST,
                post: { ...result }
            })
        })
    }
}

export function deletePost(postId) {
    return dispatch => {
        return fetch(
            ROOT_URL + POSTS + postId,
            {
                method: 'DELETE',
                headers: AUTHORIZATION_HEADERS

            }
        ).then(response => response.json())
        .then(result => {
            dispatch({
                type: types.DELETE_POST,
                result
            })
        })
    }
}

export function upvotePost(postId) {
    return dispatch => {
        return fetch(
            ROOT_URL + POSTS + postId,
            {
                method: 'POST',
                headers: AUTHORIZATION_HEADERS,
                body: JSON.stringify({option: 'upVote'})
            }
        ).then(response => response.json())
        .then(result => {
            dispatch({
                type: types.UPVOTE_POST,
                result
            })
        })
    }
}

export function downvotePost(postId) {
    return dispatch => {
        return fetch(
            ROOT_URL + POSTS + postId,
            {
                method: 'POST',
                headers: AUTHORIZATION_HEADERS,
                body: JSON.stringify({option: 'downVote'})
            }
        ).then(response => response.json())
        .then(result => {
            dispatch({
                type: types.DOWNVOTE_POST,
                result
            })
        })
    }
}

export function sortPostsByVotes() {
    return {
        type: types.SORT_POSTS_BY_VOTE_SCORE,
        result: {}
    }
}

export function sortPostsByTimestamp() {
    return {
        type: types.SORT_POSTS_BY_TIMESTAMP,
        result: {}
    }
}

export function editPost(postId, postTitle, postBody) {
    return dispatch => {
        return fetch(
            ROOT_URL + POSTS + postId,
            {
                method: 'PUT',
                headers: AUTHORIZATION_HEADERS,
                body: JSON.stringify({
                    title: postTitle,
                    body: postBody
                })
            }
        ).then(response => response.json())
        .then(result => {
            dispatch({
                type: types.EDIT_POST,
                result
            })
        })
    }
}

export function getPostDetails(postId) {
    return dispatch => {
        return fetch(
            ROOT_URL + POSTS + postId,
            {
                headers: AUTHORIZATION_HEADERS
            }
        ).then(response => response.json())
        .then(result => {
            dispatch({
                type: types.GET_POST_DETAILS,
                result
            })
        })
    }
}