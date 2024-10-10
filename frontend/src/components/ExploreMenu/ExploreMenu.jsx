//import React from 'react'
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

export default function ExploreMenu({category,setCategory}) {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Indulge in our expertly crafted menu, designed to delight your senses. From tender, slow-cooked meats to fresh, seasonal produce, every bite is a testament to our passion for flavor and quality.
        </p>
        <div className="explore-menu-list">
            {menu_list.map((item,index) => {
                return(
                    <div onClick={() => setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index}className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=''/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}
