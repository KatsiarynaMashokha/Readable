import { combineReducers } from 'redux'
import { CategoriesReducer } from './categories-reducers';
import { PostsReducer, PostDetailsReducer } from './posts-reducers';
import { CommentsReducer } from './comments-reducer';

const rootReducer = combineReducers({
    categories: CategoriesReducer,
    posts: PostsReducer,
    comments: CommentsReducer,
    currentPostDetails: PostDetailsReducer,
})

export default rootReducer;