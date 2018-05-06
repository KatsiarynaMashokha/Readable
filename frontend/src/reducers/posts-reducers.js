import * as types from '../constants/ActionTypes';

export const PostsReducer = (state = [], action) => {
    let postId;
    switch(action.type) {
        case types.FETCH_ALL_POSTS:
            return action.result;
        case types.CREATE_NEW_POST:
            let { post } = action;
            return {
                ...state, ...state.push(post)
            }
        case types.DELETE_POST:
            postId = action.result.id;
            return state.filter(post => post.id !== postId);
        case types.UPVOTE_POST:
            postId = action.result.id;
            return state.map(post => {
                if(post.id === postId) post.voteScore++;
                return post;
            });
        case types.DOWNVOTE_POST:
            postId = action.result.id;
            return state.map(post => {
                if(post.id === postId) post.voteScore--;
                return post;
            });
        case types.SORT_POSTS_BY_VOTE_SCORE:
            return state.slice().sort((a, b) => {
                return a.voteScore < b.voteScore
            })
        case types.SORT_POSTS_BY_TIMESTAMP:
            return state.slice().sort((a, b) => {
                return a.timestamp < b.timestamp
            })
        case types.EDIT_POST:
            let updatedPost = action.result;
            postId = updatedPost.id;
            return state.map(post => {
                if(post.id === postId) {
                    post.title = updatedPost.title,
                    post.body = updatedPost.body
                }
                return post
            })
        default:
            return state
    }
}

export const PostDetailsReducer = (state = [], action) => {
    switch(action.type) {
        case types.GET_POST_DETAILS:
            return action.result;
        default:
            return state
    }
}