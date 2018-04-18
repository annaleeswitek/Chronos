import { connect } from 'react-redux';
import AllCategories from './AllCategories.jsx';
import { loadCategories } from '../store/categories';

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCategories() {
      dispatch(loadCategories());
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(AllCategories);

export default Container;
