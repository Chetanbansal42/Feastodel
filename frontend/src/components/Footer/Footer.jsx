import React from 'react'
import style from './footer.module.css'
import { assets } from '../../assets/assets';
const Footer = () => {
  return (
    <div className={style.Footer} id="Footer">
      <div className={style.FooterContent}>
        <div className={style.FooterContentLeft}>
            <img src={assets.logo} alt=""  className={style.logo}/>
            <p>Feasto delivers happiness with every order — fresh food, fast delivery, and flavors you’ll love</p>
            <div className={style.FooterSocial}>
                <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className={style.FooterContentMiddle}>
            <h2>
                COMPANY
            </h2>
            <ul>
                <li>home</li>
                <li>about</li>
                <li>delivery</li>
                <li>privacy policy</li>
            </ul>
        </div>
        <div className={style.FooterContentRight}>
            <h2>Get In Touch</h2>
            <ul>
                <li>+91 7415264768</li>
                <li>feasto@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className={style.FooterCopyrigth}>
        CopyRight 2026 ©️ Company.com - All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer