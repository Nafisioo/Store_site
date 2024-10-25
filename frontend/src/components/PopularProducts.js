import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PopularProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchPopularProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products/popular/');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching popular products:", error);
            }
        };
        fetchPopularProducts();
    }, []);

    return (
        <div>
            <h2>Popular Products</h2>
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                    </div>
                ))
            ) : (
                <p>No popular products available.</p>
            )}
        </div>
    );
};

export default PopularProducts;
