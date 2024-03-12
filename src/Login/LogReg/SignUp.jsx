import React,{useState} from "react";
import { useRegisterUserMutation } from '../../Fetch_Api/Service/User_Auth_Api'
import { storeToken } from '../../Fetch_Api/Service/LocalStorageServices';
import { FormControlLabel, Checkbox, Alert, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { MdOutlineMailOutline, MdPassword } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import {motion} from 'framer-motion'

const SignUp = () => {
  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get("name"),
      email: data.get("email"),
      phone:data.get("phone"),
      password: data.get("password"),
      password2: data.get("password2"),
      tc: data.get("tc"),
    };
    const res = await registerUser(actualData);
    if (res.error) {
      // console.log(typeof (res.error.data.errors))
      // console.log(res.error.data.errors)
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      // console.log(typeof res.data);
      // console.log(res.data);
      storeToken(res.data.token);
      navigate("/");
    }
  };
  return (
    <>
      <form action="#" className="sign-up-form" onSubmit={handleSubmit}>
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
        <h2 className="titleee">Student Registration</h2>
        <div className="input-field">
        <CiUser className="log_icon"/>
          <input type="text" name="name" placeholder="UserName" />
          {server_error.name ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.name[0]}</Typography> : ""}
        </div>
        <div className="input-field">
        <MdOutlineMailOutline  className="log_icon"/>
          <input type="email" name='email' placeholder="Email" />
          {server_error.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""}
        </div>
        <div className="input-field">
        <FaPhoneAlt  className="log_icon"/>
              <input type="text" name="phone" placeholder="Phone" />
              {server_error.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.phone[0]}</Typography> : ""}
            </div>
        <div className="input-field">
        <MdPassword  className="log_icon"/>
          <input type="password" name='password' placeholder="Password" />
          {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}
        </div>
        <div className="input-field">
        <MdPassword  className="log_icon"/>
          <input type="password" name='password2' placeholder="Password Confirmation " />
          {server_error.password2 ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password2[0]}</Typography> : ""}
        </div>
        <FormControlLabel control={<Checkbox value={true} color="primary" name="tc" id="tc" />} label="By signing up, I agree with the website's Terms and Conditions." />
        {server_error.tc ? <span style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.tc[0]}</span> : ""}
        <input type="submit" className="btn" value="Sign up" />
        {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
        {/* <div className="social-media">
          <a href="#" className="social-iconn">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social-iconn">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="social-iconn">
            <i className="fab fa-google"></i>
          </a>
          <a href="#" className="social-iconn">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div> */}
      </form>
    </>
  );
};

export default SignUp;
