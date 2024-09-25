import { useState, useEffect } from 'react';
import axios from 'axios';
import FoodItem from '../../components/FoodItem/FoodItem';
import './Search.css';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const query = new URLSearchParams(useLocation().search).get('query'); // Extract the search query from the URL

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setError(''); // Reset error message

            try {
                // Adjust the API call based on the server's search endpoint
                const response = await axios.get(`http://localhost:4000/search/${query}`);
                
                if (response.data.length > 0) {
                    setProducts(response.data);  // Set the products array with the response data
                } else {
                    setError('No products found.');
                }
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchSearchResults();  // Only fetch if there's a search query
        }
    }, [query]);

    return (
        <div className='food-display' id='food-display'>
            <h1>Search Results for {query}</h1>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className='food-display-list'>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <FoodItem
                                key={index}
                                id={product._id}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                image={product.image}
                            />
                        ))
                    ) : (
                        <p>No products found for {query}.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResults;