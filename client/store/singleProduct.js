import axios from 'axios';
import store from './index.js';


/* ---- Action Types ---- */
const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT';


/* ---- Action Creators ---- */
export const getOneProduct = product => ({ type: GET_ONE_PRODUCT, product });


/* ---- Thunks ---- */

export const fetchOneProduct = function(productId){
    return function thunk(){
        axios.get(`/api/products/${productId}`) 
            .then(res => res.data)
            .then(product => {
                const action = getOneProduct(product);
                store.dispatch(action);
            })
            .catch(err => {
                console.error(err);
            })
    }
}
/* ---- Reducer ---- */
export default function (state = {}, action) {
    switch (action.type) {
        case GET_ONE_PRODUCT:
            return action.product;
        default:
            return state;
    }
}
