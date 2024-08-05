//import React from 'react'
import './Add.css';
import {assets} from '../../assets/assets';
import { useState } from 'react';

const Add = () => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price:"",
        category:"Chicken"
    });
    
    const onChngeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    // API call
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",Number(data.price));
        formData.append("category",data.category);
        formData.append("image",image);
    };

  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-image flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChngeHandler} value={data.name} type="text" name='name' placeholder='Type here'/>
            </div>
            <div className="add-product-des flex-col">
                <p>Product Description</p>
                <textarea onChange={onChngeHandler} value={data.description} name="description" rows='6' placeholder='Write product description here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onChngeHandler} name="category">
                        <option value="Chicken">Chicken</option>
                        <option value="Beef">Beef</option>
                        <option value="Spices">Spices</option>
                        <option value="Fruits & Veg">Fruits & Veg</option>
                        <option value="Pork">Pork</option>
                        <option value="Lamb">Lamb</option>
                        <option value="Fish">Fish</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={onChngeHandler} value={data.price} type="Number" name='price' placeholder='R40'/>
                </div>
            </div>
            <button type='submit' className='add-button'>ADD</button>
        </form>
    </div>
  )
}

export default Add