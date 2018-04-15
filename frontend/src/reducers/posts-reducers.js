import * as types from '../constants/ActionTypes';

export const PostsReducer = (state = [], action) => {
    let postId;
    switch(action.type) {
        case types.FETCH_ALL_POSTS:
            return action.result;
        case types.CREATE_NEW_POST:
            let { post } = action;
            console.log(state);
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
        default:
            return state
    }
}