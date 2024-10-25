import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PopularProducts from './components/PopularProducts'; // Import the PopularProducts component
import ShoppingCart from './components/ShoppingCart'; // Import the ShoppingCart component
import Comments from './components/Comments'; // Import the Comments component

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>My E-commerce Store</h1>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a> {/* Link to Popular Products */}
              </li>
              <li>
                <a href="/cart">Shopping Cart</a> {/* Link to Shopping Cart */}
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<PopularProducts />} /> {/* Route for popular products */}
          <Route path="/cart" element={<ShoppingCart />} /> {/* Route for shopping cart */}
          <Route path="/comments/:productId" element={<Comments />} /> {/* Route for comments */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

