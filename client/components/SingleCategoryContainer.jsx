import { connect } from 'react-redux';
import SingleCategory from './SingleCategory.jsx';
import { loadOneCategory } from '../store/categories';

const mapStateToProps = state => {
  return {
    selectedCategory: state.selectedCategory
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    loadOneCategory: function(categoryId){
      const thunkAction = loadOneCategory(categoryId);
      dispatch(thunkAction);
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(SingleCategory);

export default Container;
