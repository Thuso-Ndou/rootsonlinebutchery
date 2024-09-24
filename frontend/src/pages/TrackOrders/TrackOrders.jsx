import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './TrackOrders.css';
import axios from 'axios';
import { assets } from '../../assets/assets';

const TrackOrders = () => {
  // Function to fetch orders
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url+"/api/order/userorders", {}, { headers: {Authorization: `Bearer ${token}`}});

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        console.error("Failed to fetch orders:", response.data.message);
      }
      console.log("Orders fetched" + orders);
      console.log(response.data);
      console.log(token);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div id="order-section" className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="my-orders-order">
              <img src={assets.parcel} alt="Parcel" />
              <p>
                {order.items
                  .map((item, index) => (
                    `${item.product.name} x ${item.quantity}${index < order.items.length - 1 ? ', ' : ''}`
                  ))}
              </p>
              <p>R{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Refresh Orders</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrackOrders;