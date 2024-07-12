//import React from 'react'
import { assets } from '../../assets/assets';
import { useState } from 'react';
import './Nav.css';

export default function Nav() {

    const [menu,setMenu] = useState("menu");

  return (
    <div className='navbar'>
        <img src={assets.logo} alt=""  className='logo'/>

        <ul className='navbar-menu'>
            <li onClick={()=>setMenu("home")} className={menu==='home'?'active':''}>home</li>
            <li onClick={()=>setMenu("menu")} className={menu==='menu'?'active':''}>menu</li>
            <li onClick={()=>setMenu("mobile-app")}  className={menu==='mobile-app'?'active':''}>mobile-app</li>
            <li onClick={()=>setMenu("contact-us")} className={menu==='contact-us'?'active':''}>contact us</li>
        </ul>

        <div className='navbar-right'>
            <img src={assets.search} alt="search" />
            <div className='navbar-search-icon'>
                <img src={assets.cart} alt="cart" />
                <div className='dot'></div>
            </div>
            <button>sign in</button>
        </div>
    </div>
  )
}
