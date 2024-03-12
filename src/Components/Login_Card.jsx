import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { setUserToken } from "../Fetch_Api/Feature/authSlice";
import { getToken, storeToken } from "../Fetch_Api/Service/LocalStorageServices";
import { useLoginUserMutation } from "../Fetch_Api/Service/User_Auth_Api";
import { CiUser } from "react-icons/ci";
import { MdPassword } from "react-icons/md";
import {Alert,Typography} from "@mui/material";
import './Login.scss'

const Login_Card = ({close, setclose}) => {
    const [server_error, setServerError] = useState({});
    const navigate = useNavigate();
    const [loginUser, { isLoading }] = useLoginUserMutation();
    const dispatch = useDispatch();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const actualData = {
        email: data.get("email"),
        password: data.get("password"),
      };
      const res = await loginUser(actualData);
      if (res.error) {

        setServerError(res.error.data.errors);
      }
      if (res.data) {
        storeToken(res.data.token);
        let { access_token } = getToken();
        dispatch(setUserToken({ access_token: access_token }));
        navigate("/");
      }
    };
    
    let { access_token } = getToken();
    useEffect(() => {
      dispatch(setUserToken({ access_token: access_token }));
    }, [access_token, dispatch]);
  const handleclose =()=>{
   if(close){
       setclose(false);
   }
  }
  return (
    <>
    <div style={{display: `${close == true ? 'flex': 'none'}`, alignItems:"center",backdropFilter:"blur(3px)",background:" #00000039", justifyContent:"center",height:"100%", width:"100%", position:"absolute",zIndex:"999999", top:"0"}}>        
      <form action="" className="login__registre" id="login-in"  onSubmit={handleSubmit}>
        <span id="spa" onClick={handleclose}>
        <span>❌</span>
        </span>
        <h1 className="login__title">Sign In</h1>
        {server_error.non_field_errors
          ? console.log(server_error.non_field_errors[0])
          : ""}
        {server_error.email ? console.log(server_error.email[0]) : ""}
        {server_error.password ? console.log(server_error.password[0]) : ""}
        <div className="login__box">
        <CiUser className="log_icon"/>
          <input type="text" placeholder="Username" name='email' className="login__input" />
          {server_error.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""}
        </div>

        <div className="login__box">
        <MdPassword  className="log_icon"/>
          <input
            type="password"
            placeholder="Password"
            name='password'
            className="login__input"
          />
          {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}
        </div>

        <a href="#" className="login__forgot">
          Forgot password?
        </a>
        {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
        {isLoading ?  <button disabled style={{background:'#f0f0f0'}} type="submit"  value="Login" className="login__button">Login</button> : <button type="submit"  value="Login" className="login__button">Login</button> }

        {/* <a href="#" className="login__button">
          Sign In
        </a> */}

        <div>
          <span className="login__account">Don't have an Account ?</span>
          <span className="login__signin" id="sign-up">
            <Link to='/login'>Sign Up</Link>
          </span>
        </div>
      </form>
    </div>
    </>
  );
};

export default Login_Card;
