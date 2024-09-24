//import React from 'react'
import { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

export default function Cart() {

  const {cartItems,food_list,removeFromCart,getTotalAmount,url} = useContext(StoreContext);

  const [promoCode, setPromoCode] = useState('');

  const handlePromoCodeSubmit = () => {
    // Logic for applying the promo code
    console.log("Promo code submitted:", promoCode);
  };

  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
    if (cartItems[item._id] > 0) {
        return (
            <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                    <img src={url + "/images/" + item.image} alt='' />
                    <p>{item.name}</p>
                    <p>R{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>R{item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cancel'>--</p>
                </div>
                <hr />
            </div>
        );
    }
})}

      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Your Cart</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>R{getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>R{getTotalAmount()===0?0:20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>R{getTotalAmount()===0?0:getTotalAmount() + 20}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className='cart-promo'>
          <div>
            <p>Enter your promo code here</p>
            <div className="cart-promo-input">
              <input type="text" placeholder='Promo Code' value={promoCode} onChange={(e) => setPromoCode(e.target.value)}/>
              <button onClick={handlePromoCodeSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 