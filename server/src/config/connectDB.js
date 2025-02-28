import mongoose from "mongoose";
const connectToMongo = async () => {
  const uri = process.env.MONGODB_URI;
  try {
    mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongo;