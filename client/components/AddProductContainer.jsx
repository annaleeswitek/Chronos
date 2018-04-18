import { connect } from 'react-redux';
// at this point, we're in all products view and state.products = all products
import { addProduct } from '../store/addProduct';
const mapStateToProps = function(state, ownProps) {
    return {
        products: state.products
    }
}

const mapDispatchToProps = function(dispatch, ownProps){
    return {
        addProduct: function(event){
            event.preventDefault();
            const title = event.target.title.value;
            const price = event.target.price.value; 
            const imgUrl = event.target.imgUrl.value;
            const description = event.target.description.value;
            const action = addProduct({title, price, imgUrl, description}, ownProps.history);
            dispatch(action);
        }
    }
}