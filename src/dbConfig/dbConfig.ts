import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connected', ()=>{
      console.log("Connected to MongoDB successfully");
    })

    connection.on('error', (error)=>{
      console.log("Error connecting to MongoDB", error);
      process.exit();
    })

  } catch (error) {
    console.log("Something goes wrong", error);
  }
}