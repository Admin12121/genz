import { Grid, TextField, Button, Box, Alert, Typography } from "@mui/material";
import React, {useState} from 'react'
import { useSendPasswordResetEmailMutation } from "../../Fetch_Api/Service/User_Auth_Api";
import './Rest.scss'
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
    <button><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289Z" fill="white" fillOpacity="0.7"/>
<path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="white" fillOpacity="0.7"/>
</svg>
    </button>
  </div>
  <form className="restbody" id='password-reset-email-form' onSubmit={handleSubmit}>
    <div className="restinput">
      <label>We will send a recovery email to</label>
      <input name='gmail' placeholder="Your E-Mail address"/>
      {server_error.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""}
    </div>
    <div className="action">
      <button type="submit">Reset Password</button><a href="#">I don’t have access to my  E-Mail</a>
    </div>
    {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
          {server_msg.msg ? <Alert severity='success'>{server_msg.msg}</Alert> : ''}
  </form>
</div>
    </section>
    </>
  )
}

export default ResetPass;
