// import React,{useEffect,useState} from 'react'
// import "./pay.scss"
// import { getToken } from "../../Fetch_Api/Service/LocalStorageServices";
// import {useGetLoggedUserQuery, usePaymentMutation,useActiveCourseMutation  } from "../../Fetch_Api/Service/User_Auth_Api";
// const PAymentSuccess = ({api}) => {
//     const [success,setSuccess] =useState("")
//     const [pcourse , setPCourse] = useState("")
//     const { access_token} = getToken();
//     const { data, isSuccess } = useGetLoggedUserQuery(access_token);
//     const [email,setemail] =useState("");
//     const [payment, { isLoading }] = usePaymentMutation();
//     const [activecourse,{isLoad}] = useActiveCourseMutation(); 
//     const [coursename, setCoursename] = useState("")
//     const [courseData, setCourseData] = useState([])

//     useEffect(()=>{
//       fetch(api)
//       .then(response => response.json())
//       .then(data => setCourseData(data))
//       .catch(err => console.log(err))
      
//       // Get the URL parameters
//       const urlParams = new URLSearchParams(window.location.search);
//       const dataParam = urlParams.get('data');
    
//       if (dataParam) {
//         // Decode Base64
//         const decodedString = atob(dataParam);
    
//         // Parse JSON if applicable
//         try {
//           const jsonData = JSON.parse(decodedString);
//           // Store in State
//           setSuccess(jsonData);
//           const receivedSignature = jsonData.transaction_uuid;
//           const parts = receivedSignature.split('-');
//           const transactionUuid = parts[0];
//           setPCourse(transactionUuid);
//         } catch (error) {
//           console.error('Error parsing JSON:', error);
//         }
//       }

//       if(data && data.email){
//         setemail(data.email)
//       }

//       if(courseData){
//         const course = courseData.find(
//           (courseDetail) => courseDetail.id.toString() === pcourse.toString()
//         );
//         if(course){
//           setCoursename(course.course)
//         }
//       }

//     }, [api])
//     const handlepayment = async () => {
//       try {
//         // Check if data is defined
//         if (data && data.email) {
//           const actualData = {
//             user: data.email,
//             transaction_code: success.transaction_code,
//             transaction_uuid: success.transaction_uuid,
//             status: success.status,
//           };
//           const res = await payment(actualData);
//           // handleCourseActivation();
//         } else {
//           console.error('User data not available.');
//         }
//       } catch (error) {
//         console.error('Error handling payment:', error);
//       } 
//     };
//     const handleCourseActivation = async () =>{
//       try {
//         if(data && data.email){
//           const actualDeta = {
//             active_course: coursename,
//             user: data.email, 
//           };
//           const res = await activecourse(actualDeta);
//         } else {
//           console.error('fail to active course');
//         }
//       }catch(error){
//         console.log("error",error)
//       }
//     }

    
//   return (
//     <>
//      <div className="projects-section" style={{display:" flex",width:"50%", color: "#fff", alignItems: "center", justifyContent:"center"}}>
//         <div className="paycard"> 
//   <div className="headerpay"> 
//     <div className="imagepay">
//       <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 7L9.00004 18L3.99994 13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
//       </div> 
//       <div className="contentpay">
//          <span className="titlepay">Payment Complete</span> 
//          <p className="messagepay">Status : {success.status}</p> 
//          <p className="messagepay">User : {email && email}</p> 
//          <p className="messagepay">Course : {coursename && coursename}</p> 
//          <p className="messagepay">Amount : {success.total_amount}</p> 
//          <p className="messagepay">Transition Id : {success.transaction_uuid}</p> 
//          <p className="messagepay">Transition Code : {success.transaction_code}</p> 
//          </div> 
//          <div className="actionspay">
//             <button onClick={handlepayment} className="history" type="button">Active Your Course</button> 
//             </div> 
//             </div> 
//             </div>
//     </div> 
//     </>
//   )
// }

// export default PAymentSuccess

{ /* import React, { useEffect, useState } from 'react';
import "./pay.scss";
import { getToken } from "../../Fetch_Api/Service/LocalStorageServices";
import { useGetLoggedUserQuery, usePaymentMutation, useActiveCourseMutation } from "../../Fetch_Api/Service/User_Auth_Api";
import {Link} from "react-router-dom";
const PAymentSuccess = ({ api }) => {
  const [success, setSuccess] = useState("");
  const [pcourse, setPCourse] = useState("");
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const [email, setemail] = useState("");
  const [payment, { isLoading }] = usePaymentMutation();
  const [activecourse, { isLoad }] = useActiveCourseMutation();
  const [coursename, setCoursename] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [renderContent, setRenderContent] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    fetch(api)
      .then(response => response.json())
      .then(data => setCourseData(data))
      .catch(err => console.log(err))

    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');

    if (dataParam) {
      const decodedString = atob(dataParam);

      try {
        const jsonData = JSON.parse(decodedString);
        setSuccess(jsonData);
        const receivedSignature = jsonData.transaction_uuid;
        const parts = receivedSignature.split('-');
        const transactionUuid = parts[0];
        setPCourse(transactionUuid);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }

    if (data && data.email) {
      setemail(data.email)
    }

    if (courseData) {
      const course = courseData.find(
        (courseDetail) => courseDetail.id.toString() === pcourse.toString()
      );
      if (course) {
        setCoursename(course.course);
      }
    }

    setRenderContent(true); // Set renderContent to true once data is fetched
  }, [ data, courseData, pcourse]);


  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }, [buttonRef.current]);

  const handlepayment = async () => {
    try {
      if (data && data.email) {
        const actualData = {
          user: data.email,
          transaction_code: success.transaction_code,
          transaction_uuid: success.transaction_uuid,
          status: success.status,
        };
        const res = await payment(actualData);
         handleCourseActivation();
      } else {
        console.error('User data not available.');
      }
    } catch (error) {
      console.error('Error handling payment:', error);
    }
  };


  const handleCourseActivation = async () => {
    try {
      if (data && data.email) {
        const actualDeta = {
          active_course: pcourse,
          user: data.id,
        };
        const res = await activecourse(actualDeta);
      } else {
        console.error('Fail to activate course');
      }
    } catch (error) {
      console.log("Error", error)
    }
  }


  return (
    <>
      {renderContent &&  ( 
        <div className="projects-section" style={{ display: "flex", width: "50%", color: "#fff", alignItems: "center", justifyContent: "center" }}>
          <div className="paycard">
            <div className="headerpay">
              <div className="imagepay">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 7L9.00004 18L3.99994 13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
              <div className="contentpay">
                <span className="titlepay">Payment Complete</span>
                <p className="messagepay">Status : {success.status}</p>
                <p className="messagepay">User : {email && email}</p>
                <p className="messagepay">Course : {coursename && coursename}</p>
                <p className="messagepay">Amount : {success.total_amount}</p>
                <p className="messagepay">Transition Id : {success.transaction_uuid}</p>
                <p className="messagepay">Transition Code : {success.transaction_code}</p>
              </div>
              <div className="actionspay">
                <Link to="/profile" >
                <button className="history" type="button">Active Your Course</button>
                <button className="history"  ref={buttonRef} id='cltry' onClick={ handlepayment} style={{display:"none"}} type="button"></button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
 
export default PAymentSuccess; */}

import React, { useEffect, useState, useRef } from 'react';
import "./pay.scss";
import { getToken } from "../../Fetch_Api/Service/LocalStorageServices";
import { useGetLoggedUserQuery, usePaymentMutation, useActiveCourseMutation } from "../../Fetch_Api/Service/User_Auth_Api";
import { Link } from "react-router-dom";

const PaymentSuccess = ({ api }) => {
  const [success, setSuccess] = useState("");
  const [pcourse, setPCourse] = useState("");
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const [email, setemail] = useState("");
  const [payment, { isLoading }] = usePaymentMutation();
  const [activecourse, { isLoad }] = useActiveCourseMutation();
  const [coursename, setCoursename] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [renderContent, setRenderContent] = useState(false);
  const [pay,setPay]=useState(0);
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');

    if (dataParam) {
      const decodedString = atob(dataParam);

      try {
        const jsonData = JSON.parse(decodedString);
        setSuccess(jsonData);
        const receivedSignature = jsonData.transaction_uuid;
        const parts = receivedSignature.split('-');
        const transactionUuid = parts[0];
        setPCourse(transactionUuid);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }

      fetch(api)
      .then(response => response.json())
      .then(data => setCourseData(data))
      .catch(err => console.log(err))
    }
  }, [])

  useEffect(()=>{
    if (data && data.email) {
      setemail(data.email)
    }

    if (courseData) {
      const course = courseData.find(
        (courseDetail) => courseDetail.id.toString() === pcourse.toString()
      );
      if (course) {
        setCoursename(course.course);
      }
    }
    setRenderContent(true);
    if(renderContent && pay == 0){
      handlepayment();
    }
  },[data, courseData, pcourse])

  const handlepayment = async () => {
    try {
      if (data && data.email) {
        const actualData = {
          user: data.id,
          email: data.email,
          total_amount:success.total_amount,
          transaction_code: success.transaction_code,
          courseid:pcourse,
          transaction_uuid: success.transaction_uuid,
          status: success.status,
        };
        try {
          const res = await payment(actualData);
          handleCourseActivation()
      } catch (error) {
         console.log(error)
      }
        setPay(el => el+1)
        setRenderContent(false);
      }
    } catch (error) {
      console.error('Error handling payment:', error);
    }
  };
  const handleCourseActivation = async () => {
    try {
      if (data && data.email) {
        const actualDeta = {
          active_course: pcourse,
          user: data.id,
        };
        const res = await activecourse(actualDeta);
      } else {
        console.error('Fail to activate course');
      }
    } catch (error) {
      console.log("Error", error)
    }
  }
  return (
    <>
      {renderContent && (
        <div className="projects-section" style={{ display: "flex", width: "50%", color: "#fff", alignItems: "center", justifyContent: "center" }}>
          <div className="paycard">
            <div className="headerpay">
              <div className="imagepay">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 7L9.00004 18L3.99994 13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
              <div className="contentpay">
                <span className="titlepay">Payment Complete</span>
                <p className="messagepay">Status : {success.status}</p>
                <p className="messagepay">User : {email && email}</p>
                <p className="messagepay">Course : {coursename && coursename}</p>
                <p className="messagepay">Amount : {success.total_amount}</p>
                <p className="messagepay">Transition Id : {success.transaction_uuid}</p>
                <p className="messagepay">Transition Code : {success.transaction_code}</p>
              </div>
              <div className="actionspay">
                <Link to="/profile">
                  <button className="history" type="button">Active Your Course</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PaymentSuccess;

