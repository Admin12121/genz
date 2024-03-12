import {
  Alert,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { setUserToken } from "../../Fetch_Api/Feature/authSlice";
import {
  getToken, 
  storeToken,
} from "../../Fetch_Api/Service/LocalStorageServices";
import { useLoginUserMutation } from "../../Fetch_Api/Service/User_Auth_Api";
import { CiUser } from "react-icons/ci";
import { MdPassword } from "react-icons/md";
import {motion} from 'framer-motion'
const SignIn = () => {
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
      // console.log(typeof (res.error.data.errors))
      // console.log(res.error.data.errors)
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      // console.log(typeof (res.data))
      // console.log(res.data)
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

  return (
    <>
      <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
        {server_error.non_field_errors
          ? console.log(server_error.non_field_errors[0])
          : ""}
        {server_error.email ? console.log(server_error.email[0]) : ""}
        {server_error.password ? console.log(server_error.password[0]) : ""}
        <Link to="/" className="logo">
            <img src="logo.png" alt="" />
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.4,
                duration: 1,
              }}
            >
              <img src="Logo_text.png" alt="" />
            </motion.span>
          </Link>
        <h2 className="titleeeee">Sign In</h2>
        <div className="input-field">
          <CiUser className="log_icon"/>
          <input type="text" name='email' placeholder="Username" />
          {server_error.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""}
        </div>
        <div className="input-field">
          <MdPassword  className="log_icon"/>
          <input type="password" name='password' placeholder="Password" />
          {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}
        </div>
        {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
        {isLoading ?  <button disabled style={{background:'#f0f0f0'}} type="submit"  value="Login" className="btn solid">Sign In</button> : <button type="submit"  value="Login" className="btn solid">Sign In</button> }
       
        <Link to='/login/sendpasswordresetemail' >Forgot Password ?</Link>
      </form>
    </>
  );
};

export default SignIn;
