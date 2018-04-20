/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export { default as AddProduct } from './AddProduct.jsx';
export { default as AllCategories } from './AllCategories.jsx';
export { default as EditProduct } from './EditProduct.jsx';
export { default as Navbar } from './Navbar.jsx';
export { default as Searchbar } from './Searchbar.jsx';
export { default as UserHome } from './UserHome.jsx';
export { Login, Signup } from './AuthForm.jsx';
