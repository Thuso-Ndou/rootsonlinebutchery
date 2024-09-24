import { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

export default function FoodItem({ id, name, price, description, image }) {
    const { cartItems = {}, addToCart, removeFromCart, url } = useContext(StoreContext);
    const quantity = cartItems[id] || 0;

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className="food-item-image" src={url ? `${url}/images/${image}` : '/default-image.jpg'} alt={name} />
                {
                    quantity === 0 ? (
                        <img className='add' onClick={() => addToCart(id)} src={assets.plus} alt='Add to cart'/>
                    ) : (
                        <div className="food-item-counter">
                            <img onClick={() => removeFromCart(id)} src={assets.removeRed} alt='Remove from cart'/>
                            <p>{quantity}</p>
                            <img onClick={() => addToCart(id)} src={assets.addGreen} alt='Add more'/>
                        </div>
                    )
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.filledstar} alt="Rating"/>
                </div>
                <p className="food-item-description">
                    {description}
                </p>
                <p className="food-item-price">R{price}</p>
            </div>
        </div>
    );
}