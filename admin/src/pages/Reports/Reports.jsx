import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsGraphUp} from 'react-icons/bs'
 import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  ResponsiveContainer, LineChart, Line } from 'recharts';
 import axios from 'axios';
 import { useEffect, useState } from 'react';
 import './Reports.css';

function Reports() {

    const [productCount, setProductCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [provinceData, setProvinceData] = useState([]);
     
    // Fetch data from backend
  useEffect(() => {
    // Replace these with your actual backend API endpoints
    const fetchReportsData = async () => {
      try {
        // Fetch total products
        const productRes = await axios.get('/api/products/total');
        setProductCount(productRes.data.totalProducts);

        // Fetch total categories
        const categoryRes = await axios.get('/api/categories/total');
        setCategoryCount(categoryRes.data.totalCategories);

        // Fetch total customers
        const customerRes = await axios.get('/api/customers/total');
        setCustomerCount(customerRes.data.totalCustomers);

        // Fetch total revenue
        const revenueRes = await axios.get('/api/revenue');
        setRevenue(revenueRes.data.totalRevenue);

        // Fetch province data
        const provinceRes = await axios.get('/api/provinces/stats');
        setProvinceData(provinceRes.data.provinces);

      } catch (error) {
        console.error("Error fetching reports data:", error);
      }
    };

    fetchReportsData();
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
        <ResponsiveContainer width="100%" height="100%">
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
          <Bar dataKey="province" fill="#364968" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
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
                <Line type="monotone" dataKey="province" stroke="#ff6473" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Reports;