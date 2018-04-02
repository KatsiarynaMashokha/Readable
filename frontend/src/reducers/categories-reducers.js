import * as types from '../constants/ActionTypes';

export const CategoriesReducer = (state = {}, action) => {
   switch(action.type) {
       case types.FETCH_ALL_CATEGORIES:
            return action.result.categories;
       default:
            return state;
   }
}