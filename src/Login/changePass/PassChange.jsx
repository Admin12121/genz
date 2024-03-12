import { Grid, TextField, Button, Box, Alert, Typography } from "@mui/material";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from "../../Fetch_Api/Service/User_Auth_Api";
const PassChange = () => {
    const [server_error, setServerError] = useState({})
    const [server_msg, setServerMsg] = useState({})
    const [resetPassword] = useResetPasswordMutation()
    const { id, token } = useParams()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const actualData = {
        password: data.get('password'),
        password2: data.get('password2'),
      }
      const res = await resetPassword({ actualData, id, token })
      if (res.error) {
        setServerMsg({})
        setServerError(res.error.data.errors)
      }
      if (res.data) {
        setServerError({})
        setServerMsg(res.data)
        document.getElementById('password-reset-form').reset()
        setTimeout(() => {
          navigate("/login")
        }, 3000)
      }
  
    }
  return (
    <>
    <section id="restsection">
    <div className="restcard">
  <div className="restheader">
    <div className="restleft"><span className="icon_backdrop"><svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 23.8V28H2.88889C1.2934 28 0 26.7464 0 25.2V14c0-1.5464 1.2934-2.8 2.88889-2.8H13v4.2c-1.5955 0-2.8889 1.2536-2.8889 2.8 0 1.0364.581 1.9413 1.4445 2.4254V22.4c0 .7732.6467 1.4 1.4444 1.4z" fill="#fff"/><path d="M18.7778 8.4c.7977 0 1.4444-.6268 1.4444-1.4 0-3.86599-3.2335-7-7.2222-7-3.98872 0-7.22222 3.13401-7.22222 7v4.2h2.88889V7c0-2.3196 1.94013-4.2 4.33333-4.2s4.3333 1.8804 4.3333 4.2c0 .7732.6467 1.4 1.4445 1.4zM23.1111 11.2H13v4.2c1.5955 0 2.8889 1.2536 2.8889 2.8 0 1.0364-.581 1.9413-1.4445 2.4254V22.4c0 .7732-.6467 1.4-1.4444 1.4V28h10.1111C24.7066 28 26 26.7464 26 25.2V14c0-1.5464-1.2934-2.8-2.8889-2.8z" fill="#fff"/></svg></span>
      <div className="resttext">
        <span className="h">Change Password</span>
        <span className="b">Restore access to your account</span>
        </div>
    </div>
  </div>
  <form className="restbody" id='password-reset-form' onSubmit={handleSubmit}>
    <div className="restinput">
      <label>New Password</label>
      <input type="password" name='password' placeholder="New password"/>
    </div>
    {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}
    <div className="restinput">
      <label>Comform Password</label>
      <input type="password" name='password2' placeholder="Comform Password"/>
    </div>
    {server_error.password2 ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password2[0]}</Typography> : ""}
    <div className="action bttern">
      <button type="submit">Reset Password</button>
    </div>
    {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
          {server_msg.msg ? <Alert severity='success'>{server_msg.msg}</Alert> : ''}
  </form>
</div>
    </section>
    </>
  )
}

export default PassChange
