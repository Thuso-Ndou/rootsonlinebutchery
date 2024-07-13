import React, {useState} from 'react'
import './FoodItem.css';
import { assets } from '../../assets/assets';

export default function FoodItem({id,name,price,description,image}) {

    const [itemCount, setItemCount] = useState(0);

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className="food-item-image" src={image} alt=""/>
            {
                !itemCount ? <img className='add' onClick={() => setItemCount(prev=>prev+1)} src={assets.plus}/>  : <div className="food-item-counter">
                    <img onClick={() => setItemCount(prev=> prev-1)} src={assets.removeRed} alt=''/>
                    <p>{itemCount}</p>
                    <img onClick={() => setItemCount(prev=> prev+1)} src={assets.addGreen} alt=''/>
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
