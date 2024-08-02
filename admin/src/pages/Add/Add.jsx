//import React from 'react'
import './Add.css';
import {assets} from '../../assets/assets';

const Add = () => {
  return (
    <div className='add'>
        <form className='flex-col'>
            <div className="add-image flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={assets.upload} alt="" />
                </label>
                <input type="file" id='image' hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input type="text" name='name' placeholder='Type here'/>
            </div>
            <div className="add-product-des flex-col">
                <p>Product Description</p>
                <textarea name="description" rows='6' placeholder='Write product description here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select name="category">
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
                    <input type="Number" name='price' placeholder='R40'/>
                </div>
            </div>
            <button type='submit' className='add-button'>ADD</button>
        </form>
    </div>
  )
}

export default Add