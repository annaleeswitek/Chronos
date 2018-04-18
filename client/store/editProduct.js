import axios from 'axios';
import { getOneProduct } from './singleProduct';

/* ---- Action Types---- */
const EDIT_PRODUCT = 'EDIT_PRODUCT';

/* ---- Thunks ---- */
export const editProduct = function(product, history){
    return function thunk(dispatch){
        return axios.put(`/products/${product.id}`, product)
            .then(res => res.data)
            .then(updatedProduct => {
                const action = getOneProduct(updatedProduct);
                dispatch(action);
                history.push(`/products/${product.id}`)
            })
            .catch(next)
    }
}