//import React from 'react'
import { useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

export default function PlaceOrder() {

  const {getTotalAmount} = useContext(StoreContext)

  return (
    <form className="place-order">  
      <div className="place-order-left">
      <p className="title">Delivery Information</p>
        <div className="mult-fields">
          <input type="text" placeholder='First Name'/>
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="email" placeholder='Email Address'/>
        <input type="text" placeholder='Street'/>
        <div className="mult-fields">
          <input type="text" placeholder='City'/>
          <input type="text" placeholder='State' />
        </div>
        <div className="mult-fields">
          <input type="text" placeholder='Zip Code'/>
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
      </div>

      <div className="place-order-rigt">
      <div className="cart-total">
          <h2>Total Billing</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>R{getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>R{20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>R{getTotalAmount() + 20}</b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}
