import {useContext} from 'react'
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

export default function FoodItem({id,name,price,description,image}) {

    const {cartItems, addToCart, removeFromCart,url} = useContext(StoreContext);

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className="food-item-image" src={url+"/images/"+image} alt=""/>
            {
                !cartItems[id] ? <img className='add' onClick={() => addToCart(id)} src={assets.plus}/>  : <div className="food-item-counter">
                    <img onClick={() => removeFromCart(id)} src={assets.removeRed} alt=''/>
                    <p>{cartItems[id]}</p>
                    <img onClick={() => addToCart(id)} src={assets.addGreen} alt=''/>
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.filledstar} alt="" />
            </div>
            <p className="food-item-description">
                {description}
            </p>
            <p className="food-item-price">R{price}</p>
        </div>
    </div>
  )
}
