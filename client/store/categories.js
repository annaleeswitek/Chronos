import axios from 'axios';

// Action Types

export const RECEIVE_CATEGORIES = 'RECIEVE_CATEGORIES';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';

// Action Creators

export const receiveCategories = (categories) => {
  return {
    type: RECEIVE_CATEGORIES,
    receivedCategories: categories
  };
};

export const selectCategory = (categoryToSelect) => {
  return {
    type: SELECT_CATEGORY,
    selectedCategory: categoryToSelect
  };
};

// Thunk Middlewear

export const loadCategories = () => {
  return function thunk (dispatch) {
    return axios.get('/api/categories')
      .then(res => res.data)
      .then(theCategories => {
        const action = receiveCategories(theCategories);
        dispatch(action);
      })
      .catch(err => console.error(err));
  };
};

export const loadOneCategory = (categoryId) => {
  return function thunk (dispatch) {
    return axios.get(`/api/categories/${categoryId}`)
      .then(res => res.data)
      .then(theCategory => {
        const action = selectCategory(theCategory);
        dispatch(action);
      })
      .catch(err => console.error(err));
  };
};

// Reducer

export const categoriesReducer = function(state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.receivedCategories;
    default: return state;
  }
};

export const selectedCategoryReducer = function(state = {}, action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.selectedCategory;
    default: return state;
  }
};
