import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import { selectedCategoryReducer, categoriesReducer} from './categories';

const reducer = combineReducers({user, selectedCategoryReducer, categoriesReducer});
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store
export * from './user';
