//import React from 'react'
import { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const url = "http://localhost:4000";

  const [list,setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/meat/list`);
    if(response.data.success){
      setList(response.data.data);
    }
    else{
      toast.error("Error");
    }
  }

  const removeProduct = async(meatID) =>{
    //api call
    const response = await axios.post(`${url}/api/meat/remove`,{id:meatID});
    await fetchList();
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Products</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>R{item.price}</p>
              <p className='cancel-text' onClick={()=>removeProduct(item._id)}>--</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
