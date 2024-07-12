import mongoose from "mongoose";

const connectToDb = () => {
  mongoose
    .connect(process.env.DBCONNECTION)
    .then(() => console.log("Connected to DB successfully..."))
    .catch(() => console.log("Error connecting to DB!"));
};

export default connectToDb;
