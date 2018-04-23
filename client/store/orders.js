import axios from 'axios';

/* ---- Action Types ---- */
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY';

/* ---- Action Creators ---- */
const getOrderHistory = orderHistory => ({ type: GET_ORDER_HISTORY, orderHistory });

/* ---- Thunks ---- */
export const getOrders = order => {
  return function thunk(dispatch) {
    axios.get(`/api/orders/${order.id}`)
      .then(res => res.data)
      .then(orders => dispatch(getOrderHistory(orders)))
      .catch(err => console.error(err));
  };
};

/* ---- Reducer ---- */
export default function (state = [], action) {
  switch (action.type){
    case GET_ORDER_HISTORY:
      return action.orderHistory;
    default:
      return state;
  }
}
