import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import categories from './categories';
import selectedCategory from './singleCategory';
import products from './products';
import product from './singleProduct';
import user from './user';

const reducer = combineReducers({ user, products, product, categories, selectedCategory });
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
export * from './categories';
export * from './singleCategory';
export * from './products';
export * from './singleProduct';
export * from './user';
