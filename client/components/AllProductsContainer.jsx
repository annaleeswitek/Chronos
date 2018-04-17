import { connect } from 'react-redux';
import AllProducts from './AllProducts';

const mapStateToProps = function(state){
    return {
        products: state.products
    }
}

const mapDispatchToProps = function(dispatch){
    return {
        getAllProducts: function(){
            dispatch(getAllProducts());
        }
    }
}

const AllProductsContainer = connect(mapDispatchToProps, mapStateToProps)(AllProducts);
 
