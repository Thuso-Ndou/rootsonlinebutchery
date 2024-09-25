import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsGraphUp} from 'react-icons/bs'
 import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  ResponsiveContainer, LineChart, Line } from 'recharts';
 import axios from 'axios';
 import { useEffect, useState } from 'react';
 import './Reports.css';

function Reports() {

  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [provinceData, setProvinceData] = useState([]);
  const [addressData, setAddressData] = useState([]); // New state for address data
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    // Fetch product count
    axios.get("http://localhost:4000/reports/productCount")
      .then(response => {
        console.log("Product Count Response:", response.data);
        setProductCount(response.data?.productCount || 0);  // Fallback to 0 if undefined
      })
      .catch(error => {
        if (error.response) {
          console.error("Error Response:", error.response.data);
        } else if (error.request) {
          console.error("Error Request:", error.request);
        } else {
          console.error("General Error:", error.message);
        }
      });
  
    // Fetch category count
    axios.get("http://localhost:4000/reports/categoryCount")
      .then(response => {
        console.log("Category Count Response:", response.data);
        setCategoryCount(response.data?.categoryCount || 0);  // Fallback to 0 if undefined
      })
      .catch(error => {
        if (error.response) {
          console.error("Error Response:", error.response.data);
        } else if (error.request) {
          console.error("Error Request:", error.request);
        } else {
          console.error("General Error:", error.message);
        }
      });
  
    // Fetch customer count
    axios.get("http://localhost:4000/reports/customerCount")
      .then(response => {
        console.log("Customer Count Response:", response.data);
        setCustomerCount(response.data?.customerCount || 0);  // Fallback to 0 if undefined
      })
      .catch(error => {
        if (error.response) {
          console.error("Error Response:", error.response.data);
        } else if (error.request) {
          console.error("Error Request:", error.request);
        } else {
          console.error("General Error:", error.message);
        }
      });
  
    // Fetch revenue
    axios.get("http://localhost:4000/reports/revenue")
      .then(response => {
        console.log("Revenue Response:", response.data);
        setRevenue(response.data?.revenue || 0);  // Fallback to 0 if undefined
      })
      .catch(error => {
        if (error.response) {
          console.error("Error Response:", error.response.data);
        } else if (error.request) {
          console.error("Error Request:", error.request);
        } else {
          console.error("General Error:", error.message);
        }
      });
  
    // Fetch province data
    axios.get("http://localhost:4000/reports/provinceData")
      .then(response => {
        console.log("Province Data Response:", response.data);
        setProvinceData(response.data || []);  // Fallback to empty array if undefined
      })
      .catch(error => {
        if (error.response) {
          console.error("Error Response:", error.response.data);
        } else if (error.request) {
          console.error("Error Request:", error.request);
        } else {
          console.error("General Error:", error.message);
        }
      });
  
    // Fetch address data
    axios.get("http://localhost:4000/reports/addressData")
      .then(response => {
        console.log("Address Data Response:", response.data);
        setAddressData(response.data || []);  // Fallback to empty array if undefined
      })
      .catch(error => {
        if (error.response) {
          console.error("Error Response:", error.response.data);
        } else if (error.request) {
          console.error("Error Request:", error.request);
        } else {
          console.error("General Error:", error.message);
        }
      });
  }, []);
  

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>REPORTS</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>PRODUCTS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>{productCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CATEGORIES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>{categoryCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CUSTOMERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{customerCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>REVENUE</h3>
                    <BsGraphUp className='card_icon'/>
                </div>
                <h1>R{revenue}</h1>
            </div>
        </div>

        <div className='charts'>
        {Array.isArray(provinceData) && provinceData.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={500}
                height={300}
                data={provinceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={20}
              >
                <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="count" fill="#364968" background={{ fill: '#eee' }} />
              </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                width={500}
                height={300}
                data={provinceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#ff6473" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </>
        ) : (
          <p>No province data available</p>
        )}
      </div>

      <div className='address-list'>
        <h3>Addresses</h3>
        {Array.isArray(addressData) && addressData.length > 0 ? (
          addressData.map((address, index) => (
            <div key={index} className='address-item'>
              <h4>{address.street}, {address.city}, {address.province}</h4>
            </div>
          ))
        ) : (
          <p>No address data available</p>
        )}
      </div>
    </main>
  )
}

export default Reports;