import * as types from '../constants/ActionTypes';

export const CommentsReducer = (state = [], action) => {
    let commentId;
    let comment;
    let updatedComment;
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
        case types.ADD_POST_COMMENT:
            comment = action.result;
            return [...state, comment]
        case types.EDIT_COMMENT:
            updatedComment = action.result;
            commentId = updatedComment.id;
            return state.map(comment => {
                if(comment.id === commentId) {
                    comment.body = updatedComment.body,
                    comment.timestamp = updatedComment.timestamp
                }
                return comment;
            })
        default:
            return state;
    }
}