import React, { Component } from 'react';
import AllProductsContainer from './AllProducts.jsx';
import { fetchProducts } from '../store/products';
import { connect } from 'react-redux';

export class Searchbar extends Component {
    constructor() {
        super();
        this.state = {
            inputValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    // componentDidMount() {
    //     this.props.fetchProducts();
    // }

    handleChange(event) {
        const value = event.target.value;
          this.setState({ inputValue: value });
    }

    render() {
        const inputValue = this.state.inputValue;
        const filteredProducts = this.props.products ? this.props.products.filter(product => product.title.match(inputValue)) : [];
        
        console.log('search state', this.state);
        console.log('props', this.props);
    return (
        <form className="form-group" >
          <input onChange={this.handleChange} value={inputValue} className="form-control" placeholder="What Are You Looking For?" />
          <AllProductsContainer products={filteredProducts} />
        </form>
        );
    }
}

/* ---- Container ---- */
const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts())
});

const SearchbarContainer = connect(mapDispatchToProps)(Searchbar);
export default SearchbarContainer;
