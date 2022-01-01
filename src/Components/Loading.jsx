import React from "react";
import loadingGif from "../images/gif/loading-arrow.gif";
export default function Loading({message}) {
  return (
    <div className="loading" style={{marginTop : "100px"}}>
      <h4>{message}</h4>
      <img src={loadingGif} alt="loading please wait" />
    </div>
  );
}
