import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

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
        <div>
            <h1>Search Results for {query}</h1>
            <div>
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id}>
                            <img src={`/images/${product.image}`} alt={product.name} />
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No products found for {query}.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
