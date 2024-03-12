import React from "react";
import "./Nav.scss";
import Links from "./Links/Links";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { SiTiktok } from "react-icons/si";
import Button from "../Components/Button";
import Bar from "./Bar/Bar";
import { motion } from "framer-motion";
import { useNavigate,Link } from "react-router-dom";
import { unSetUserToken } from '../Fetch_Api/Feature/authSlice';
import {getToken, removeToken} from  '../Fetch_Api/Service/LocalStorageServices'
// import { setUserInfo, unsetUserInfo } from '../Fetch_Api/Feature/userSlice';
import { PiUserCircleLight } from "react-icons/pi";
import Logout from "../Components/Logout";

const Navebar = () => {
  const { access_token } = getToken()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(unSetUserToken({ access_token: null }))
    removeToken()
    navigate('/')
  }
  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
        className={`Navbar_wrapper`}
      >
        <motion.div
          className="logo"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, duration: 1 }}
        >
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
        </motion.div>
        <Links />
        <Bar />
        {access_token ? <motion.div className="social_logo" >
          <Link to='./profile' className="Profile_pi">
          <PiUserCircleLight/>
          </Link>
        <Link>
          <Logout handleLogout={handleLogout} text="Log out" />
        </Link>
      </motion.div> : <div className="social_logo">
          <Link to="login">
          <Button text="Log In" />
          </Link>
          <Link to="login">
          <Button text="Sign Up" />
          </Link>
        </div>}
        
      </motion.div>
    </>
  );
};

export default Navebar;
