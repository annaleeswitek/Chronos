import axios from 'axios';

/* ---- Action Types ---- */
const SET_PRODUCTS_IN_CART = 'SET_PRODUCTS_IN_CART';

/* ---- Action Creators --- */
const setProductsInCart = (productsInCart) => {
  return {
    type: SET_PRODUCTS_IN_CART,
    productsInCart
  };
};

/* --- Thunks --- */
export const loadProductsForCart = () => {
  return function thunk (dispatch) {
    return axios.get('/api/cart/products')
      .then(res => {
        console.log('res.data on line 19', res.data);
        return res.data;
      })
      .then(theProducts => {
        const action = setProductsInCart(theProducts);
        console.log('the action:', action)
        dispatch(action);
      })
      .catch(err => console.error(err));
  };
};

/* --- Reducer --- */
export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS_IN_CART:
      return action.productsInCart;
    default:
    return state;
  }
}
