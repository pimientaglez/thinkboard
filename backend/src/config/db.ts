import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_DB_URI) {
      throw new Error(
        "MONGO_DB_URI is not defined in the environment variables"
      );
    }
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    console.error("Error connecting to MONGODB", error);
    process.exit(1); // exit with failure
  }
};
