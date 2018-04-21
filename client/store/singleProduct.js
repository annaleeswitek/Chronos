import axios from 'axios';
import store from './index'; // What is the store being used for here?  Can we delete this line?  --GSS
import history from '../history';

/* ---- Action Types ---- */
const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT';

/* ---- Action Creators ---- */
export const getOneProduct = product => ({ type: GET_ONE_PRODUCT, product });

/* ---- Thunks ---- */
export const fetchOneProduct = function (productId){
    return function thunk(dispatch){
        axios.get(`/api/products/${productId}`)
            .then(res => res.data)
            .then(product => {
                const action = getOneProduct(product);
                dispatch(action);
            })
            .catch(err => {
                console.error(err);
            });
    };
};

export const addProduct = function (product, categories){
    return function thunk(dispatch){
        console.log('product in thunk: ', product);
        console.log('categories in thunk: ', categories) //returns expected value from form
        axios.post('/api/products', product)
        .then(res => {
            
            return res.data
        })
        .then(newProduct => {
            // console.log('new product', newProduct);
            const action = getOneProduct(newProduct);
            dispatch(action);
            history.push(`/products/${newProduct.id}`);
        })
        .catch(err => {
            console.error(err);
        });
    };
};

export const editProduct = function (product) {
    return function thunk(dispatch){
        return axios.put(`/api/products/${product.id}`, product)
        .then(res => res.data)
        .then(updatedProduct => {
            const action = getOneProduct(updatedProduct);
            dispatch(action);
        })
        .catch(err => {
            console.error(err);
        });
    };
};

/* ---- Reducer ---- */
export default function (state = {}, action) {
    switch (action.type) {
        case GET_ONE_PRODUCT:
            return action.product;
        default:
            return state;
    }
}
