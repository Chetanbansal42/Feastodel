import { useContext, useEffect, useState } from 'react'
import style from './placeorder.module.css'
import style1 from '../Cart/cart.module.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItem, URl } = useContext(StoreContext)

  const [method, setMethod] = useState("online");

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  const navigate = useNavigate()

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];

    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItem[item._id]
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 5,
      paymentMethod: method
    }

    try {

      let response = await axios.post(
        URl + "/api/order/place",
        orderData,
        { headers: { token } }
      )

      if (response.data.success) {

        // COD
        if (method === "cod") {
          alert("Order Placed Successfully")
          navigate("/myorders")
        }

        // ONLINE PAYMENT
        else {
          const { session_url } = response.data;
          window.location.replace(session_url)
        }

      } else {
        console.log(response.data.message)
        alert("Error")
      }

    } catch (error) {
      console.log(error)
      alert("Something Went Wrong")
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart")
    }
  }, [token])

  return (
    <form onSubmit={placeOrder} className={style.placeOrder}>

      <div className={style.placeOrderLeft}>

        <p className={style.title}>Delivery Details</p>

        <div className={style.multiInputs}><input type="text" name="firstName"onChange={onChangeHandler}value={data.firstName}placeholder='First Name' required />

          <input
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder='Last Name'
            required
          />
        </div>

        <input
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder='Email Address'
          required
        />

        <input
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder='Street'
          required
        />

        <div className={style.multiInputs}>
          <input
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            placeholder='City'
            required
          />

          <input
            type="text"
            placeholder='State'
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            required
          />
        </div>

        <div className={style.multiInputs}>
          <input
            type="text"
            placeholder='Zip Code'
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            required
          />

          <input
            type="text"
            placeholder='Country'
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            required
          />
        </div>

        <input
          type="text"
          placeholder='Phone Number'
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          required
        />

      </div>

      <div className={style.placeOrderRight}>

        <div className={style1.CartTotal}>

          <h2>Cart Total</h2>

          <div>

            <div className={style1.CartTotalDetails}>
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className={style1.CartTotalDetails}>
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 5}</p>
            </div>

            <hr />

            <div className={style1.CartTotalDetails}>
              <b>Total</b>
              <b>
                ₹{getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 5}
              </b>
            </div>

          </div>

          
          <div className={style.paymentMethods}>

            <h3>Select Payment Method</h3>

            <div className={style.paymentOption}>

              <input
                type="radio"
                id="online"
                name="payment"
                value="online"
                checked={method === "online"}
                onChange={(e) => setMethod(e.target.value)}
              />

              <label htmlFor="online">
                Online Payment
              </label>

            </div>

            <div className={style.paymentOption}>

              <input
                type="radio"
                id="cod"
                name="payment"
                value="cod"
                checked={method === "cod"}
                onChange={(e) => setMethod(e.target.value)}
              />

              <label htmlFor="cod">
                Cash On Delivery
              </label>

            </div>

          </div>

          <button type='submit'>
            {method === "cod"
              ? "Place Order"
              : "Proceed To Payment"}
          </button>

        </div>

      </div>

    </form>
  )
}

export default PlaceOrder