import { combineReducers } from 'redux'
import { CategoriesReducer } from './categories-reducers';

const rootReducer = combineReducers({
    categories: CategoriesReducer,
})

export default rootReducer;