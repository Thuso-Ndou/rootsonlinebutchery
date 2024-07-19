//import React from 'react'
import { assets } from '../../assets/assets';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer" id="footer">
      <div className='footer-content'>
        <div className="footer-content-left">
          <img src={assets.logo} alt=''/>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum maiores reprehenderit quis impedit in error quas vel beatae quidem dolor, saepe odio quae et atque nihil voluptatem iure! Fugiat, quo!</p>
          <div className="footer-social-icons">
            <img src={assets.fab} alt=''/>
            <img src={assets.insta} alt=''/>
            <img src={assets.twitter} alt=''/>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Roots</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Contact</h2>
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
