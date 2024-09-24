//import React from 'react'
import { assets } from '../../assets/assets';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';
import { StoreContext } from '../../context/StoreContext';

export default function Nav({setShowLogin}) {

    const [menu,setMenu] = useState("home");
    const {getTotalAmount,token,setToken} = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        // navigate user to home page
        navigate("/");
    }
    const handleMenuClick = () => {
        setMenu("menu");
        navigate("/"); // navigate to the home page first
        setTimeout(() => {
            const section = document.querySelector('#explore-menu');
            section?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    const handleContactClick = () => {
        setMenu("contact-us");
        navigate("/"); // navigate to the home page first
        setTimeout(() => {
            const section = document.querySelector('#footer');
            section?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    const handleOrderClick = () => {
        setMenu("track-order");
        navigate("/trackOrders"); // navigate to the view orders page
        setTimeout(() => {
            const orderSection = document.querySelector('#order-section');
            orderSection?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

  return (
    <div className='navbar'>
        <Link to='/' onClick={()=>setMenu("home")}><img src={assets.logo} alt=""  className='logo'/></Link>

        <ul className='navbar-menu'>
            <Link to='/'  onClick={()=>setMenu("home")} className={menu==='home'?'active':''}>Home</Link>
            <div id='na' onClick={handleMenuClick} className={menu==='menu'?'active':''}>Menu</div>
            <div id='na' onClick={handleOrderClick}  className={menu==='track-order'?'active':''}>View Orders</div>
            <div id='na' onClick={handleContactClick} className={menu==='contact-us'?'active':''}>Contact Us</div>
        </ul>

        <div className='navbar-right'>
            <div><img src={assets.helpY}/></div>
            <img src={assets.search} alt="search" />
            <div className='navbar-search-icon'>
                <Link to='/cart'><img src={assets.cart} alt="cart" /></Link>
                <div className={getTotalAmount()===0?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>:<div className='navbar-profile'>
            <img src={assets.userProfile} alt="" />
            <ul className="nav-profile-dropdown">
                <li onClick={logout}><img src={assets.logoutIcon} alt="" /><p>Logout</p></li>
            </ul>
            </div>}    
        </div>
    </div>
  )
}
