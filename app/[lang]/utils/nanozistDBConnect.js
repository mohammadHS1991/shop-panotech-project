import mongoose from "mongoose";
import React from "react";

const nanozistDBConnect = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  try {
    return await mongoose.connect(process.env.PANOTECH_DB);
  } catch (err) {
    console.log("some err");
  }
};

export default nanozistDBConnect;
