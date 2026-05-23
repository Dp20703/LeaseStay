import mongoose from "mongoose";
const URL = process.env.MONGO_URI;

function connectDB() {
  mongoose
    .connect(URL)
    .then(() => {
      console.log("Connect to Db ✅");
    })
    .catch((error) => {
      console.log("Failed to connect with db", error);
    });
}

export default connectDB;
