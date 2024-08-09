//import React from 'react'
import { useContext, useEffect, useState } from 'react';
import {StoreContext} from '../../context/StoreContext';
import './TrackOrders.css';
import axios from 'axios';
import {assets} from '../../assets/assets';

const TrackOrders = () => {

  const {url,token} = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
    setData(response.data.data);
  }

  useEffect(()=>{
    if(token){
      fetchOrders();
    }
  },[token]);

  return (
    <div id="order-section" className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel} alt="" />
              <p>{order.items.map((item,index)=>{
                if(index === order.items.length - 1){
                  return item.name + " x " + item.quantity;
                }
                else{
                  return item.name + " x " + item.quantity + ", ";
                }
              })}</p>
              <p>R{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button onClick={fetchOrders}>Track Orders</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TrackOrders