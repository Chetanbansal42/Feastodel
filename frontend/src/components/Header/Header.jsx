import React from 'react'
import style from './header.module.css'
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={style.header}>
        <div className={style.headerContent}>
            <h2>Order your favourite food here</h2>
            <p>Choose from a diverse menu featuring a delicious variety of dishes crafted to satisfy every craving.</p>
            <button onClick={(e)=>navigate('/FoodDisplay')}>View Menu</button>
        </div>
    </div>
  )
}

export default Header