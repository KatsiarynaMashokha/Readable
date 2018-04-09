import { combineReducers } from 'redux'
import { CategoriesReducer, PostsForCategory } from './categories-reducers';
import { PostsReducer } from './posts-reducers';

const rootReducer = combineReducers({
    categories: CategoriesReducer,
    posts: PostsReducer,
    currentPosts: PostsForCategory
})

export default rootReducer;