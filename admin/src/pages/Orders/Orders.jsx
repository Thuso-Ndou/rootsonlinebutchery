import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Orders.css';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Function to fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  // Function to change order status
const statusHandler = async (event, orderId) => {
  try {
      const response = await axios.post(`${url}/api/order/status`, {
          orderId,
          status: event.target.value,
      });
      if (response.data.success) {
          // Optionally use response.data.data to update the specific order in state
          await fetchOrders(); // Refresh the order list
      } else {
          toast.error("Error updating order status");
      }
  } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status");
  }
};

  useEffect(() => {
    fetchOrders();
  }, [url]);


  return (
    <div className='order add'>
      <div className="hsort">
        <h3>Recent Orders</h3>
        <p className="sortData">Sort <img src={assets.sort}/></p>
      </div>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className='order-item'>
            <img src={assets.parcel2} alt="Parcel" />
            <div>
              <p className='order-item-f'>
                {order.items.map((item, index) => (
                  `${item.product.name} x ${item.quantity}${index < order.items.length - 1 ? ', ' : ''}`
                ))}
              </p>
              <p className='order-item-n'>
                {`${order.address.firstName} ${order.address.lastName}`}
              </p>
              <div className="order-item-a">
                <p>{`${order.address.street},`}</p>
                <p>{`${order.address.suburb},`}</p>
                <p>{`${order.address.city}, ${order.address.province}, ${order.address.zipCode}`}</p>
                
              </div>
              <p className='order-item-p'>{order.address.phone}</p>
              <p>{order.createdAt}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>R{order.amount}.00</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Packaging">Food Packaging</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;