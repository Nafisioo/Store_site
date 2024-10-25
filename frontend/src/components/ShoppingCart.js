import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/cart/'); // Adjust this endpoint as needed
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    return (
        <div>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item, index) => (
                    <div key={index}>
                        <h3>{item.name}</h3>
                        <p>Price: ${item.price}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ShoppingCart;


