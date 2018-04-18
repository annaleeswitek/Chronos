import axios from 'axios';
import store from '../store.js';
//action type
const ADD_PRODUCT = 'ADD_PRODUCT';

//action creator
export const addProduct = function(product, history){
    return function thunk(dispatch){
        axios.post('/api/products', product)
            .then(res => res.data)
            .then(newProduct => {
                const action = getOneProduct(newProduct);
                dispatch(action);
                history.push(`/products/${newProduct.id}`)
            })
            .catch(err => {
                console.error(err);
            })
    }
}

