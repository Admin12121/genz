import React from 'react'
import "./NOticication.scss"
const Notification = ({data,message,set}) => {
  return (
    <>
     <div className={`toast ${message ? "active" : ""} `}>
        <div className="toast-content">
            <i className="fas fa-solid fa-check check">
                <img src="./logo.png" alt="" />
            </i>
            <div className="message">
                <span className="textt text-1">{data ?  "Success" : "Fail"}</span>
                <span className="textt text-2">{data}</span>
            </div>
        </div>
        <i className="fa-solid fa-xmark close" onClick={()=>{set(prev=>!prev)}}>❌</i>
        <div className={`progress ${message ? "active" : ""}`}></div>
    </div> 
    </>
  )
}

export default Notification
