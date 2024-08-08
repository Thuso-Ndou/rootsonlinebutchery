//import React from 'react'
import { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

export default function PlaceOrder() {

  const {getTotalAmount,token,food_list,cartItems,url} = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    suburb: "",
    city: "",
    zipCode: "",
    province: "",
    email: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["Quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    console.log(orderItems);
    
    //call api
  }

  return (
    <form onSubmit={placeOrder} className="place-order">  
      <div className="place-order-left">
      <p className="title">Delivery Information</p>
        <div className="mult-fields">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName}  type="text" placeholder='First Name'/>
          <input name='lastName' onChange={onChangeHandler} value={data.lastName}  type="text" placeholder='Last Name' />
        </div>
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
        <div className="mult-fields">
          <input name='suburb' onChange={onChangeHandler} value={data.suburb} type="text" placeholder='Suburb/Town'/>
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
        </div>
        <div className="mult-fields">
          <input name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip Code'/>
          <input name='province' onChange={onChangeHandler} value={data.province} type="text" placeholder='Province' />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address'/>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
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
              <p>R{getTotalAmount()===0?0:20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>R{getTotalAmount()===0?0:getTotalAmount() + 20}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}
