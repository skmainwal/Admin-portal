import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { errorHandlerFunc } from "../../store/action";
import "react-toastify/dist/ReactToastify.css";

const ErrorPopUp = ({ message, message_type }) => {
  const dispatch = useDispatch();

  const notify = () => {
    if (message_type === "success") {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        dispatch(errorHandlerFunc(null));
      }, 2000);
      return;
    } else if (message_type === "info") {
      toast.info(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        dispatch(errorHandlerFunc(null));
      }, 2000);
      return;
    } else if (message_type === "warn") {
      toast.warn("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        dispatch(errorHandlerFunc(null));
      }, 2000);
      return;
    } else if (message_type === "error") {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        dispatch(errorHandlerFunc(null));
      }, 2000);
      return;
    }
  };

  useEffect(() => {
    notify();
  }, []);
  return (
    <div>
      {/*<button onClick={notify}>Notify!</button>*/}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </div>
  );
};

export default ErrorPopUp;
