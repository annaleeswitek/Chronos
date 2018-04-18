import axios from 'axios';
import history from '../history';
import { getOneProduct } from './singleProduct';

/* ---- Action Types---- */
const EDIT_PRODUCT = 'EDIT_PRODUCT';

/* ---- Thunks ---- */
export const editProduct = function(product, history){ // move me into single product :D -- KHWB
    return function thunk(dispatch){
        return axios.put(`/api/products/${product.id}`, product)
            .then(res => res.data)
            .then(updatedProduct => {
                console.log('updatedProduct in editProduct thunk: ', updatedProduct)
                const action = getOneProduct(updatedProduct);
                // need to update your products array; dispatch an update product action creator -- KHHW
                dispatch(action);
                // history.push(`/products/${product.id}`)
            })
            .catch(err => {
                console.error(err);
            })
    }
}