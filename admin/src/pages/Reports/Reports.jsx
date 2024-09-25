import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsGraphUp} from 'react-icons/bs'
 import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  ResponsiveContainer, LineChart, Line } from 'recharts';
 import './Reports.css';

function Reports() {

    const data = [
        {
          name: 'Gauteng',
          province: 2400,
        },
        {
          name: 'Limpopo',
          province: 1398,
        },
        {
          name: 'Free State',
          province: 9800,
        },
        {
          name: 'KZN',
          province: 3908,
        },
        {
          name: 'Eastern Cape',
          province: 4800,
        },
        {
          name: 'Western Cape',
          province: 3800,
        },
        {
          name: 'Northern Cape',
          province: 4300,
        },
      ];
     

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
                <h1>300</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CATEGORIES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>12</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CUSTOMERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>33</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>REVENUE</h3>
                    <BsGraphUp className='card_icon'/>
                </div>
                <h1>R42</h1>
            </div>
        </div>

        <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
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
                data={data}
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