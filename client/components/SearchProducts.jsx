import React, { Component } from 'react';
import AllProductsContainer, { AllProducts } from './AllProducts.jsx';
import { fetchProducts } from '../store/products';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log('search bar props: ', this.props)
        // this.props.fetchProducts();
    }

    // componentWillReceiveProps(nextProps){
    //     console.log('search bar next props: ', nextProps)
    // }

    handleChange(event) {
        const value = event.target.value;
          this.setState({ inputValue: value });
    }

    render() {
        const inputValue = this.state.inputValue;
        const filteredProducts = this.props.products ? this.props.products.filter(product => product.title.match(inputValue)) : [];
        console.log('products', this.props.products)
    return (
        <div>
            <span>Search Product</span>
        <form className="form-group">
          <input onChange={this.handleChange} value={inputValue} className="form-control" placeholder="What Are You Looking For?" />
        </form>
        <div className="list-group">
            {
                filteredProducts.map(product => {
                    return (
                        <div className="list-group-item" key={product.id}>
                            <Link to={`/products/${product.id}`}>{product.title}</Link>
                        </div>
                    )
                })
            }
        </div>
        </div>
        );
    }
}

/* ---- Container ---- */
const mapStateToProps = state => ({
    products: state.products
});

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts())
});

const SearchbarContainer = connect(mapStateToProps, mapDispatchToProps)(Searchbar);
export default SearchbarContainer;
