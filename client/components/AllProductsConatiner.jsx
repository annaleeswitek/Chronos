import { connect } from 'react-redux';
import AllProducts from './AllProducts';

const mapDispatchToProps = function(dispatch){
    return {
        getAllProducts: function(){
            dispatch(getAllProducts());
        }
    }
}

const mapStateToProps = function(state){
    return {
        products: state.products
    }
}

const AllProductsContainer = connect(mapDispatchToProps, mapStateToProps)(AllProducts);
 
