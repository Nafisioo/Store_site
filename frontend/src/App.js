import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PopularProducts from './components/PopularProducts';
import ShoppingCart from './components/ShoppingCart';
import Comments from './components/Comments';
import PasswordResetRequestForm from './components/PasswordResetRequestForm';
import PasswordResetForm from './components/PasswordResetForm';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>My E-commerce Store</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link> {/* Link to Popular Products */}
              </li>
              <li>
                <Link to="/cart">Shopping Cart</Link> {/* Link to Shopping Cart */}
              </li>
              <li>
                <Link to="/password-reset-request">Forgot Password?</Link> {/* Link to Password Reset Request */}
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<PopularProducts />} /> {/* Route for popular products */}
          <Route path="/cart" element={<ShoppingCart />} /> {/* Route for shopping cart */}
          <Route path="/comments/:productId" element={<Comments />} /> {/* Route for comments */}
          <Route path="/password-reset-request" element={<PasswordResetRequestForm />} /> {/* Route for password reset request */}
          <Route path="/reset-password/:uid/:token" element={<PasswordResetForm />} /> {/* Route for password reset */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
