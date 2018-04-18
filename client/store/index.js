import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import categories from './categories';
<<<<<<< HEAD


=======
>>>>>>> master
import products from './products';
import product from './singleProduct';

<<<<<<< HEAD
const fakeUsers = [
  {
    email: 'wow@gmail.com',
    password: '1234',
    isAdmin: true
  },
  {
    email: '1234@aol.com',
    password: 'wow',
    isAdmin: false
  }
];

const reducer = combineReducers({ user, products, users: fakeUsers, categories });
=======
const reducer = combineReducers({ user, products, product, categories });
>>>>>>> master
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './products';
