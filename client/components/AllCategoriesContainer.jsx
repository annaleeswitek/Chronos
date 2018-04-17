import { connect } from 'react-redux';
import AllCategories from './AllCategories.jsx';
import { loadCategories } from '../store/';

const mapStateToProps = (state) => {
  return {
    allCategories: state.allCategories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: function () {
      const thunk = loadCategories();
      dispatch(thunk);
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(AllCategories);

export default Container;
