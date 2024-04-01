import { useState } from 'react';
import style from "../style.module.scss"
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
    <div className="restleft"><span className="icon_backdrop"><svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M13 23.8V28H2.88889C1.2934 28 0 26.7464 0 25.2V14c0-1.5464 1.2934-2.8 2.88889-2.8H13v4.2c-1.5955 0-2.8889 1.2536-2.8889 2.8 0 1.0364.581 1.9413 1.4445 2.4254V22.4c0 .7732.6467 1.4 1.4444 1.4z" fill="#fff"/><path d="M18.7778 8.4c.7977 0 1.4444-.6268 1.4444-1.4 0-3.86599-3.2335-7-7.2222-7-3.98872 0-7.22222 3.13401-7.22222 7v4.2h2.88889V7c0-2.3196 1.94013-4.2 4.33333-4.2s4.3333 1.8804 4.3333 4.2c0 .7732.6467 1.4 1.4445 1.4zM23.1111 11.2H13v4.2c1.5955 0 2.8889 1.2536 2.8889 2.8 0 1.0364-.581 1.9413-1.4445 2.4254V22.4c0 .7732-.6467 1.4-1.4444 1.4V28h10.1111C24.7066 28 26 26.7464 26 25.2V14c0-1.5464-1.2934-2.8-2.8889-2.8z" fill="#fff"/></svg></span>
      <div className="resttext">
        <span className="h">Change Password</span>
        <span className="b">Restore access to your account</span>
        </div>
    </div>
  </div> 
  <form className="restbody" style={{display:"flex", flexDirection: "column", gap:"20px"}} id='password-reset-form' onSubmit={handleSubmit}>
    <div className="restinput">
    <div className={style.inputForm} style={{border: `${ server_error.non_field_errors || server_error.password ?  "1px solid red": server_msg.msg ? "1px solid green" :""}`}}>
    <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="-64 0 512 512"
          height="20"
        >
          <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
          <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
        </svg>
        <input placeholder="New Password" className={style.input} type="password" name='password' required/>
      </div>
    </div>
    <div className="restinput">
    <div className={style.inputForm} style={{border: `${ server_error.non_field_errors || server_error.password2 ?  "1px solid red": server_msg.msg ? "1px solid green" :""}`}}>
    <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="-64 0 512 512"
          height="20"
        >
          <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
          <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
        </svg>
        <input placeholder="Comform Password" className={style.input} type="password" name='password2' required/>
      </div>
    </div>
    <div className="action bttern">
      <button style={{marginTop:"0"}} type="submit">Reset Password</button>
    </div>
    <p style={{textAlign: "center",color:`${server_error.non_field_errors || server_error.password || server_error.password2 ? "red": "green"}`}}>
          { server_error.non_field_errors  && <p> {server_error.non_field_errors[0]} </p> }
          { server_error.password  && <p> {server_error.password[0]} </p> }
          { server_error.password2  && <p> {server_error.password2[0]} </p> }
          {server_msg.msg && <p>{server_msg.msg}</p>}
    </p>
  </form>
</div>
    </section>
    </>
  )
}

export default PassChange
