import mongoose from "mongoose";

const panotechDBConnect = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  try {
    return await mongoose.connect(process.env.PANOTECH_DB);
  } catch (err) {
    console.log("some err");
  }
};

export default panotechDBConnect;
