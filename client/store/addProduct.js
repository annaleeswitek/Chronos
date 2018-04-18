import axios from 'axios';
import { getOneProduct } from './singleProduct';

/* ---- Action Types ---- */
const ADD_PRODUCT = 'ADD_PRODUCT';

/* ---- Action Creators ---- */
export const addProduct = function(product, history){ // move to single product -- KHWB
    return function thunk(dispatch){
        axios.post('/api/products', product)
            .then(res => res.data)
            .then(newProduct => {
                console.log('new product: ', newProduct)
                console.log('history', history);
                const action = getOneProduct(newProduct);
                dispatch(action);
                // history.push(`/products/${newProduct.id}`)
            })
            .catch(err => {
                console.error(err);
            })
    }
}

