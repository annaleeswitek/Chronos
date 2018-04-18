import { connect } from 'react-redux';
import SingleCategory from './SingleCategory.jsx';
import { loadOneCategory } from '../store/categories';

const mapStateToProps = state => {
  return {
    selectedCategory: state.selectedCategory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadOneCategory() {
      dispatch(loadOneCategory());
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(SingleCategory);

export default Container;
