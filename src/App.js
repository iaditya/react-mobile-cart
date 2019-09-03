import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <ProductList />
      <Details />
      <Cart />
      <Default />
      {/* <div style={{background: "#efefef"}} className="container">
        <div className="row">
          <div className="col-md">
            One of three columns
            </div>
          <div className="col-md">
            One of three columns
          </div>
          <div className="col-md">
            One of three columns
          </div>
        </div>
      </div> */}
    </React.Fragment>
  );
}

export default App;
