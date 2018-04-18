import { connect } from 'react-redux';
// at this point, we're in all products view and state.products = all products
import { addProduct } from '../store/addProduct';
import AddProduct from './AddProduct.jsx';

const mapStateToProps = function(state, ownProps) {
    return {
        products: state.products
    }
}

const mapDispatchToProps = function(dispatch, ownProps){
    return {
        addProduct: function(event){
            event.preventDefault();
            // title and price need user friendly validations
            const title = event.target.title.value ? event.target.title.value : 'Fake Title'
            const price = event.target.price.value ? event.target.price.value : 0.00
            const description = event.target.description.value ? event.target.description.value : '';
            const quantity = event.target.quantity.value ? event.target.quantity.value : 0;
            const imgUrl = event.target.imgUrl.value ? event.target.imgUrl.value : '';
            
            const action = addProduct({title, price, description, quantity, imgUrl}, ownProps.history);
            dispatch(action);
        }
    }
}

const AddProductContainer = connect(mapStateToProps, mapDispatchToProps)(AddProduct);
export default AddProductContainer;