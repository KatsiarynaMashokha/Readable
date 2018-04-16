import * as types from '../constants/ActionTypes';

export const CommentsReducer = (state = [], action) => {
    let commentId;
    switch(action.type) {
        case types.FETCH_POST_COMMENTS:
            return action.result;
        case types.UPVOTE_COMMENT:
            commentId = action.result.id;
            return state.map(comment => {
                if(comment.id === commentId) comment.voteScore++;
                return comment;
            })
        case types.DOWNVOTE_COMMENT:
            commentId = action.result.id;
            return state.map(comment => {
                if(comment.id === commentId) comment.voteScore--;
                return comment;
            })
        case types.DELETE_COMMENT:
            commentId = action.result.id;
            return state.filter(comment => comment.id !== commentId);
        default:
            return state;
    }
}