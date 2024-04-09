import mongoose from "mongoose";
import { DB_CONNECT } from "./constants.js";

const URI = DB_CONNECT ;


const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Successfully connected to DB!");
  } catch (error) {
    console.error("Connection failed!");
    process.exit(0);
  }
};

export default connectDb;
