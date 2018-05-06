import { ROOT_URL, COMMENTS, POSTS } from '../constants/constants';
import * as types from '../constants/ActionTypes';
import { AUTHORIZATION_HEADERS } from './constants';

export function fetchPostComments(postId) {
    return dispatch => {
        return fetch(
            ROOT_URL + POSTS + postId + COMMENTS,
            {
                headers: AUTHORIZATION_HEADERS
            }
        )
        .then(response => response.json())
        .then(result => {
            dispatch({
                type: types.FETCH_POST_COMMENTS,
                result
            })
        })
    }
}

export function upvoteComment(commentId) {
    return dispatch => {
        return fetch(
            ROOT_URL + COMMENTS + commentId,
            {
                method: 'POST',
                headers: AUTHORIZATION_HEADERS,
                body: JSON.stringify({option: 'upVote'})
            }
        ).then(response => response.json())
        .then(result => {
            dispatch({
                type: types.UPVOTE_COMMENT,
                result
            })
        })
    }
}

export function downvoteComment(commentId) {
    return dispatch => {
        return fetch(
            ROOT_URL + COMMENTS + commentId,
            {
                method: 'POST',
                headers: AUTHORIZATION_HEADERS,
                body: JSON.stringify({option: 'downVote'})
            }
        ).then(response => response.json())
        .then(result => {
            dispatch({
                type: types.DOWNVOTE_COMMENT,
                result
            })
        })
    }
}

export function deleteComment(commentId) {
    return dispatch => {
        return fetch(
            ROOT_URL + COMMENTS + commentId,
            {
                method: 'DELETE',
                headers: AUTHORIZATION_HEADERS,
            }
        ).then(response => response.json())
        .then(result => {
            dispatch({
                type: types.DELETE_COMMENT,
                result
            })
        })
    }
}

export function addPostComment(comment) {
    return dispatch => {
        return fetch(
            ROOT_URL + COMMENTS,
            {
                method: 'POST',
                headers: AUTHORIZATION_HEADERS,
                body: JSON.stringify(comment)
            }
        ).then(response => response.json())
        .then(result => {
            dispatch({
                type: types.ADD_POST_COMMENT,
                result: {...result}
            })
        })
    }
}

export function editComment(commentId, commentBody, timestamp) {
    return dispatch => {
        return fetch(
            ROOT_URL + COMMENTS + commentId,
            {
                method: 'PUT',
                headers: AUTHORIZATION_HEADERS,
                body: JSON.stringify({
                    timestamp: timestamp,
                    body: commentBody
                })
            }
        ).then(response => response.json())
        .then(result => {
            dispatch({
                type: types.EDIT_COMMENT,
                result: {...result}
            })
        })
    }
}