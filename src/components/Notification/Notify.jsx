// src/components/Notification.jsx
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Export both ToastContainer and toast so you can use toast anywhere
export const notify = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  info: (msg) => toast.info(msg),
  warn: (msg) => toast.warn(msg),
};

export function notification(data){
  console.log("data ppp",data)
  if (data.status=="success"){
    notify.success(data.message)
  }
  else if (data.status=="failure" || data.status=="error"){
    console.log("inside fail")
    notify.error(data.message)
  }
}

export default function NotificationContainer() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
}
