import axios from 'axios';

/* ---- Action Types ---- */

const GET_CART = 'GET_CART';

/* ---- Action Creators --- */

const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
};


/* --- Thunks --- */
export const loadCart = () => {
  return function thunk (dispatch) {
    return axios.get('/api/cart')
      .then(res => {
        console.log('res.data on line 19', res.data);
        return res.data;
      })
      .then(cart => {
        const action = getCart(cart);
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
        //whoops res.data is actually the products but we want to be sending back the cart
        console.log('this is the cart right heck yeah it is', res.data);
        return res.data;
      })
      //think this should be cart => dispatch(getCart(cart))??

      .then(cart => dispatch(getCart(cart)))
      .catch(err => console.error(err))
  }
}

/* --- Reducer --- */
export default function (state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart.products;
    default:
    return state;
  }
}
