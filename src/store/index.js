

import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { categoriesReducer } from './categoriesReducer';

const rootReducer = combineReducers({
    categories: categoriesReducer
})

export const store = createStore(rootReducer, composeWithDevTools());