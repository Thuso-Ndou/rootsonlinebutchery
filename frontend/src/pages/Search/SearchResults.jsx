import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import FoodItem from '../../components/FoodItem/FoodItem';
import './Search.css';

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const query = new URLSearchParams(useLocation().search).get('query'); // Extract the search query from the URL

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`/api/meat/search?query=${query}`);
                if (response.data.success) {
                    setProducts(response.data.products);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError("Failed to fetch products.");
            } finally {
                setLoading(false);
            }
        };
        fetchSearchResults();
    }, [query]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='food-display' id='food-display'>
            <h1>Search Results for {query}</h1>
            <div className='food-display-list'>
                {products.length > 0 ? (
                    products.map((product,index) => (
                        <FoodItem key={index} id={product._id} name={product.name} description={product.description} price={product.price} image={product.image}/>
                    ))
                ) : (
                    <p>No products found for {query}.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
