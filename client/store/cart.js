import axios from 'axios';

/* ---- Action Types ---- */
const SET_PRODUCTS_IN_CART = 'SET_PRODUCTS_IN_CART';
const GET_CART = 'GET_CART';

/* ---- Action Creators --- */
const setProductsInCart = productsInCart => {
  return {
    type: SET_PRODUCTS_IN_CART,
    productsInCart
  };
};

const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
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

export const addToCart = (product) => {
  return function thunk (dispatch) {
    return axios.post(`/api/cart/add-to-cart/products/${product.id}`, product)
      .then(res => {
        console.log('this is the cart right heck yeah it is', res.data);
        return res.data;
      })
      .then(cart => dispatch(getCart(cart)))
      .catch(err => console.error(err))
  }
}

/* --- Reducer --- */
export default function (state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case SET_PRODUCTS_IN_CART:
      return action.productsInCart;
    default:
    return state;
  }
}
