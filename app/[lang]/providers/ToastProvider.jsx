"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { vazirFD } from "../fonts/font";

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer
        toastClassName={() =>
          "w-64 sm:w-96 text-sm sm:text-base relative flex px-2 py-3 min-h-20 rounded-md justify-between overflow-hidden cursor-pointer border shadow-md text-default-900 bg-white"
        }
        bodyClassName={() => `${vazirFD.className} flex items-center`}
      />
    </>
  );
}
