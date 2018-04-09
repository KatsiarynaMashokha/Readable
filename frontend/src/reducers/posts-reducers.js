import * as types from '../constants/ActionTypes';

export const PostsReducer = (state = [], action) => {
    switch(action.type) {
        case types.FETCH_ALL_POSTS:
            return action.result;
        default:
            return state
    }
}