import React, { useState, useEffect } from "react";
import "./Pay.css";
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";

const Payment = ({instructor, offerPrice, price, course, id }) => {
  const [totalAmount, setTotalAmount] = useState(offerPrice);
  const [errors, setErrors] = useState(false);
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1000000); // Adjust the range as needed
  };

  // Set initial state for transactionUuid
  const [transactionUuid, setTransactionUuid] = useState(
    `${id}-${generateRandomNumber()}-${generateRandomNumber()}`
  );
  const [productCode, setProductCode] = useState("EPAYTEST");
  const [secret, setSecret] = useState("8gBm/:&EnhH.1/q");
  const [signature, setSignature] = useState("");

  useEffect(() => {
    generateSignature();
  }, [totalAmount, transactionUuid, productCode, secret]);

  const generateSignature = () => {
    try {
      const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
      const hash = CryptoJS.HmacSHA256(message, secret);
      const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
      setSignature(hashInBase64);
    } catch (error) {
      console.error("Error generating signature:", error);
    }
  };
  const handleSubmit =(e) =>{
    e.preventDefault();
    esewaCall()
  }
  const esewaCall = () => {
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form/";
    var params = {
      amount: totalAmount,
      product_service_charge: 0,
        product_delivery_charge: 0,
        tax_amount: 0,
        total_amount: totalAmount,
        transaction_uuid: transactionUuid,
        product_code: "EPAYTEST",
        signature:signature,
        signed_field_names:"total_amount,transaction_uuid,product_code",
        success_url: "http://localhost:3000/profile/paymentsuccess",
        failure_url: "http://localhost:3000/profile/courseses"
  }

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
}


const [data, setData] = useState("");
useEffect(()=>{
  setData(instructor)
},[])
// console.log(instructor)

  return (
    <>
      <div className="main__cards cardssw">
        <div className="cards__inner">
          <div className="cards__card cardde">
            <h2 className="card__heading">Basic to Advance</h2>
            <div className="price">
              <p className="card__price">रु{offerPrice}</p>
              <del>
                <p className="card__price">रु{price}</p>
              </del>
            </div>
            <ul role="list" className="card__bullets flow">
              <li>Access to the course for Lifetime</li>
              <li>Access to all New updates of the Course</li>
              <li>24 hrs Support</li>
              <li>Instructor : {data}</li>
              <li>Certificate</li>
            </ul>
            <form className="payform"
              onSubmit={handleSubmit}
            >
            <div className="card__cta">
              <button  className="cta" style={{border:"0"}} type="submit">Buy Course</button>
              <Link to="/profile/registration"  className="cta" style={{border:"0"}} >Admission Form</Link>
              
            </div>
            
            </form>
          </div>
        </div>
        <div className="overlay cards__inner"></div>
      </div>
    </>
  );
};

export default Payment;
