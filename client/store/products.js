import axios from 'axios';
import history from '../history';

/* ---- Action Tyoes ---- */
const GET_PRODUCTS = 'GET_PRODUCTS';

/* ---- Initial State ---- */
// const defaultProduct = {};

/* ---- Action Creators ---- */
const getProducts = products => ({ type: GET_PRODUCTS, products});

/* ---- Thunks ---- */
export const fetchProducts = () => {
    return function thunk(dispatch) {
        return axios.get('/api/products')
        .then(res => res.data)
        .then(products => {
            const action = getProducts(products);
            dispatch(action);
        });
    };
};

/* ---- Reducer ---- */
export default function (state = [], action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products;
        default:
            return state;
    }
}
