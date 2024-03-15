import React, {useState} from 'react'
import { Link } from "react-router-dom";
import { useSendPasswordResetEmailMutation } from "../../Fetch_Api/Service/User_Auth_Api";
import './Rest.scss'
import style from "../style.module.scss"
import { blue } from '@mui/material/colors';
const ResetPass = () => {
    const [server_error, setServerError] = useState({})
    const [server_msg, setServerMsg] = useState({})
    const [sendPasswordResetEmail, { isLoading }] = useSendPasswordResetEmailMutation();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const actualData = {
        email: data.get('gmail'),
      }
      const res = await sendPasswordResetEmail(actualData)
      if (res.error) {
        setServerMsg({})
        setServerError(res.error.data.errors)
      }
      if (res.data) {
        setServerError({})
        setServerMsg(res.data)
        document.getElementById('password-reset-email-form').reset()
      }
    }
  return (
    <>
    <section id="restsection">
    <div className="restcard">
  <div className="restheader">
    <div className="restleft">
      <span className="icon_backdrop">
        <svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M13 23.8V28H2.88889C1.2934 28 0 26.7464 0 25.2V14c0-1.5464 1.2934-2.8 2.88889-2.8H13v4.2c-1.5955 0-2.8889 1.2536-2.8889 2.8 0 1.0364.581 1.9413 1.4445 2.4254V22.4c0 .7732.6467 1.4 1.4444 1.4z" fill="#fff"/>
        <path d="M18.7778 8.4c.7977 0 1.4444-.6268 1.4444-1.4 0-3.86599-3.2335-7-7.2222-7-3.98872 0-7.22222 3.13401-7.22222 7v4.2h2.88889V7c0-2.3196 1.94013-4.2 4.33333-4.2s4.3333 1.8804 4.3333 4.2c0 .7732.6467 1.4 1.4445 1.4zM23.1111 11.2H13v4.2c1.5955 0 2.8889 1.2536 2.8889 2.8 0 1.0364-.581 1.9413-1.4445 2.4254V22.4c0 .7732-.6467 1.4-1.4444 1.4V28h10.1111C24.7066 28 26 26.7464 26 25.2V14c0-1.5464-1.2934-2.8-2.8889-2.8z" fill="#fff"/></svg>
        </span>
      <div className="resttext">
        <span className="h">Can't Login?</span>
        <span className="b">Restore access to your account</span>
        </div>
    </div>
    <Link to='/login'>
    <svg width="24px"  height="24px"  viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Iconly/Light/Arrow---Left" stroke="#000000"  stroke-width="1.5"  fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="Arrow---Left" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) translate(5.500000, 4.000000)" stroke="#000000"  stroke-width="1.5" >
            <line x1="6.7743" y1="15.75" x2="6.7743" y2="0.75" id="Stroke-1"></line>
            <polyline id="Stroke-3" points="12.7987 9.7002 6.7747 15.7502 0.7497 9.7002"></polyline>
        </g>
    </g>
</svg>
    </Link>
  </div>
  <form className="restbody" id='password-reset-email-form' onSubmit={handleSubmit}>
    <div className="restinput">
      <label>We will send a recovery email to</label>
      <div className={style.inputForm} style={{border: `${ server_error.non_field_errors || server_error.email ?  "1px solid red": server_msg.msg ? "1px solid green" :""}`}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="0 0 32 32"
          height="20"
        >
          <g data-name="Layer 3" id="Layer_3">
            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
          </g>
        </svg>
        <input placeholder="Enter your Email" className={style.input} type="text" name='gmail' required/>
      </div>
    </div>
    <div className="action">
      <button type="submit">Reset Password</button><a href="#">I don’t have access to my  <span style={{color:"blue"}}>E-Mail</span></a>
    </div>
    <p className="server_message" style={{color:`${server_error.non_field_errors || server_error.email ? "red": "green"}`}}>
      {server_error.non_field_errors  && <p>{server_error.non_field_errors[0]}</p>}
      {server_msg.msg && <p>{server_msg.msg}</p>}
      {server_error.email && <p>{server_error.email}</p>}
    </p>
  </form>
</div>
    </section>
    </>
  )
}

export default ResetPass;
