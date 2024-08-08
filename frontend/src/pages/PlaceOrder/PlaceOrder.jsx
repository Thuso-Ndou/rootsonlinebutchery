//import React from 'react'
import { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

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
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount()+20,
    }
    // send to api
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }

  return (
    <form onSubmit={placeOrder} className="place-order">  
      <div className="place-order-left">
      <p className="title">Delivery Information</p>
        <div className="mult-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName}  type="text" placeholder='First Name'/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName}  type="text" placeholder='Last Name' />
        </div>
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
        <div className="mult-fields">
          <input required name='suburb' onChange={onChangeHandler} value={data.suburb} type="text" placeholder='Suburb/Town'/>
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
        </div>
        <div className="mult-fields">
          <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip Code'/>
          <input required name='province' onChange={onChangeHandler} value={data.province} type="text" placeholder='Province' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address'/>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
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
