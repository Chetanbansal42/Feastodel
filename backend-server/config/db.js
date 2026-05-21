import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
        console.log("Mongo URI:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("DB Connected"));
}
