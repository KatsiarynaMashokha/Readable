import { combineReducers } from 'redux'
import { CategoriesReducer, PostsForCategory } from './categories-reducers';
import { PostsReducer } from './posts-reducers';
import { CommentsReducer } from './comments-reducer';

const rootReducer = combineReducers({
    categories: CategoriesReducer,
    posts: PostsReducer,
    currentPosts: PostsForCategory,
    comments: CommentsReducer,
})

export default rootReducer;