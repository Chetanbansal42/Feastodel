import "dotenv/config"
import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import dns from 'dns';

dns.setServers(['1.1.1.1','8.8.8.8']);

// app configurations
const app = express();
const port = process.env.PORT || 4000;
console.log("ENV CHECK:", process.env.STRIPE_SECRET_KEY);

//middleware
app.use(express.json()) // For parsing json files coming to backend
app.use(cors()) // To access backend from any frontend


// DB Connection 
connectDB();

// API Endpoint 
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Http Requests
app.get('/', (req, res) => {
    res.send("API Working")
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Frontend Connected Successfully"
  });
  });
// To Run on port 4000
app.listen(port,()=>{
    console.log(`Server Running on http://localhost:${port}`)
})