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
                <textarea name="description" rows='6' placeholder='Write content here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select name="category">
                        <option value="Chicken"></option>
                        <option value="Beef"></option>
                        <option value="Spices"></option>
                        <option value="Fruits & Veg"></option>
                        <option value="Pork"></option>
                        <option value="Lamb"></option>
                        <option value="Fish"></option>
                        <option value="Other"></option>
                    </select>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Add