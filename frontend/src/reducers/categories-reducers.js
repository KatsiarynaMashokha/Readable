import * as types from '../constants/ActionTypes';

export const CategoriesReducer = (state = {}, action) => {
   switch(action.type) {
       case types.FETCH_ALL_CATEGORIES:
            return action.result.categories;
       default:
            return state;
   }
}

export const PostsForCategory = (state = {}, action) => {
    switch(action.type) {
        case types.FETCH_POSTS_FOR_CATEGORY:
            let posts = action.result;
            return Object.values(posts).map(post =>( {id: post.id, post: post} ))
        default:
            return state;
    }
}