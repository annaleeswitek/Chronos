import axios from 'axios';

/* ---- Action Types ---- */
const SET_CATEGORIES = 'SET_CATEGORIES';

/* ---- Action Creators ---- */
const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    categories
  };
};

/* ---- Thunks ---- */
export const loadCategories = () => {
  return function thunk (dispatch) {
    return axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => {
        const action = setCategories(categories);
        dispatch(action);
      })
      .catch(err => console.error(err));
  };
};

/* ---- Reducer ---- */
export default function (state = [], action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    default:
    return state;
  }
}

