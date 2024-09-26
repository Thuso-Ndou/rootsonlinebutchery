//import React from 'react'
import { assets } from '../../assets/assets';
import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer" id="footer">
      <div className='footer-content'>
        <div className="footer-content-left">
          <img src={assets.logo} alt='' className='logo'/>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum maiores reprehenderit quis impedit in error quas vel beatae quidem dolor, saepe odio quae et atque nihil voluptatem iure! Fugiat, quo!</p>
          <div className="footer-social-icons">
            <img src={assets.fab} alt='' className='icons'/>
            <img src={assets.insta} alt='' className='icons'/>
            <img src={assets.twitter} alt='' className='icons'/>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Butchery</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {/* Use Link to navigate to /help and scroll to About Us */}
              <Link to="/help#about-us">About Us</Link>
            </li>
            <li>
            <Link to="/help#delivery">Delivery</Link>
            </li>
            <li>
            <Link to="/help#policy-refund">Refund Policy</Link>
              </li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Contact Us</h2>
          <ul>
            <li>+27-60-878-8226</li>
            <li>contact@rootsonline.com</li>
          </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyrights">Copyright 2024 @ Rootsonlinebutchery.com - All Rights Reserved</p>
    </div>
  )
}
