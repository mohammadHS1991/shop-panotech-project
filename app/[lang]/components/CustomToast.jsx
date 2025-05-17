import { Bounce, toast } from "react-toastify";

const CustomToast = (type, text) => {
  if (type === "success") {
    return toast.success(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl: true,
      transition: Bounce,
    });
  } else if (type === "warning") {
    return toast.warning(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl: true,
      transition: Bounce,
    });
  } else if (type === "error") {
    return toast.error(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl: true,
      transition: Bounce,
    });
  } else if (type === "info") {
    return toast.info(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      rtl: true,
      transition: Bounce,
    });
  }
};

export default CustomToast;
