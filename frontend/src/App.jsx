import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/Login/LoginPopUp'
import Verify from './Pages/Verify/Verify'
import MyOrders from './Pages/Orders/MyOrders'
import axios from "axios";
import { useEffect } from "react";
import FoodDisplay from './components/foodDisplay/FoodDisplay'

   
const App = () => {
   
   useEffect(() => {

    const fetchData = async () => {
      try {
      
        const response = await axios.get(
          "https://feastodel-1.onrender.com/api/test"
        );
     
        console.log(response.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, []);







  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/FoodDisplay"element={<FoodDisplay category="All" />}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App
