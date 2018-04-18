import AllProducts from './AllProducts.jsx';
import { connect } from 'react-redux';
import {fetchProducts} from '../store/products';

const mapStateToProps = function(state){
    return {
        products: state.products,
        // user: users[0]
    };
};

const mapDispatchToProps = function(dispatch){
    return {
        fetchProducts: function(){
            dispatch(fetchProducts());
        }
    };
};

const AllProductsContainer = connect(mapStateToProps, mapDispatchToProps)(AllProducts);

export default AllProductsContainer;

