import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    await mongoose.connect(String(process.env.MONGO_URI) );
    console.log("Connected to MongoDB database sucessfully")

  }catch(err){
    console.log("Error connection to database", err)
  }
}