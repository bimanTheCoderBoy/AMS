import React from "react";
import HashLoader from "react-spinners/HashLoader";


export default function Loader({ loading, color = "#10b981", size = 50 }) {
  return (
    <div className="my-auto mx-auto h-full">
    <HashLoader color={color} loading={loading} size={size} />
   </div>
  )
}
