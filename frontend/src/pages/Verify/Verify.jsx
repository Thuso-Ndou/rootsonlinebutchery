//mport React from 'react'
import { useContext } from 'react';
import './Verify.css';
import {useSearchParams} from 'react-router-dom';
import {StoreContext} from '../../context/StoreContext';

function Verify() {

    const [searchText, setSearchText] = useSearchParams();
    const success = searchText.get("success");
    const orderId = searchText.get("orderId");
    const {url} = useContext(StoreContext);

  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify