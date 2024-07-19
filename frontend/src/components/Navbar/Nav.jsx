//import React from 'react'
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav() {

    const [menu,setMenu] = useState("menu");

  return (
    <div className='navbar'>
        <img src={assets.logo} alt=""  className='logo'/>

        <ul className='navbar-menu'>
            <Link to='/'  onClick={()=>setMenu("home")} className={menu==='home'?'active':''}>Home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==='menu'?'active':''}>Menu</a>
            <a href='#track-order' onClick={()=>setMenu("track-order")}  className={menu==='track-order'?'active':''}>Track Order</a>
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==='contact-us'?'active':''}>Contact Us</a>
        </ul>

        <div className='navbar-right'>
            <img src={assets.search} alt="search" />
            <div className='navbar-search-icon'>
                <img src={assets.cart} alt="cart" />
                <div className='dot'></div>
            </div>
            <button>Sign In</button>
        </div>
    </div>
  )
}
