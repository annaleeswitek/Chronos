import { connect } from 'react-redux';
// at this point, we're in all products view and state.products = all products
import { editProduct } from '../store/editProduct';
import EditProduct from './EditProduct.jsx';

const mapStateToProps = function(state, ownProps) { // don't pull in more params if we don't need them -- KHWB
    return {
        product: state.product
    }
}

const mapDispatchToProps = function(dispatch, ownProps){
    return {
        editProduct: function(product, event){
            event.preventDefault();
            product.title = event.target.title.value || product.title; // consider || instead of ? : -- KHWB
            product.price = event.target.price.value ? event.target.price.value : product.price;
            product.imgUrl = event.target.imgUrl.value ? event.target.imgUrl.value : product.imgUrl;
            product.quantity = event.target.quantity.value ? event.target.quantity.value: product.quantity;
            product.description = event.target.description.value ? event.target.description.value : product.description;
            const action = editProduct(product);
            dispatch(action);
        }, 

    }
}

const EditProductContainer = connect(mapStateToProps, mapDispatchToProps)(EditProduct);
export default EditProductContainer;