//mport React from 'react'
import { useContext, useEffect } from 'react';
import './Verify.css';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {StoreContext} from '../../context/StoreContext';
import axios from 'axios';

function Verify() {

    const [searchText, setSearchText] = useSearchParams();
    const success = searchText.get("success");
    const orderId = searchText.get("orderId");
    const amount = searchText.get("amount");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(url+"/api/order/verify",{success, orderId, amount});
        if(response.data.success){
            navigate("/trackOrders");
        }
        else {
            // Call verifyOrder even if payment failed 
            await axios.post(url + "/api/order/verify", { success: false, orderId, amount });
            navigate("/");
        }
    };

    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify