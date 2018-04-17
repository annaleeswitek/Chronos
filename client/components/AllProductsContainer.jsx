import AllProducts from './AllProducts';
import { connect } from 'react-redux';

const mapStateToProps = function(state){
    return {
        products: state.products
    };
};

const mapDispatchToProps = function(dispatch){
    return {
        getProducts: function(){
            dispatch(getProducts());
        }
    };
};

const AllProductsContainer = connect(mapStateToProps, mapDispatchToProps)(AllProducts);

