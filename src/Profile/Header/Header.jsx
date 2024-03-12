import React, {useState, useEffect, useRef} from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./header.scss";
import { MdOutlineMailOutline } from "react-icons/md";
import { GiRamProfile } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { IoMdHelpCircle } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { getMode } from '../../Fetch_Api/Service/LocalStorageServices';

const Header = ({ handleLogout, name, profile, email, darkMode }) => {
  const [open, setOpen] = useState(false);

  let menuRef = useRef();
  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }
  });

  return (
    <div className="app-header">
      <div className="app-header-left">
        {/* <span className="app-icon"></span>
        <p className="app-name">Portfolio</p> */}
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
      </div>
      <div className="app-header-right">
        <button className="mode-switch"  title="Switch Theme">
          <label className="dayNight">
            <input type="checkbox" onClick={darkMode} />
            <div></div>
          </label>
        </button>
        {/* <button className="notification-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-bell"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button> */}
        <div ref={menuRef}>
        <button className="profile-btn" onClick={()=>{setOpen(!open)}}>
          <img src={profile} alt="Profile" />

          {/* <span>{name}</span> */}
        </button>
        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <h3>{name}<br/><span>{email}</span></h3>
          <span>
            <DropdownItem img = { <GiRamProfile />} to={""} text = {"My Profile"}/>
            <DropdownItem img = {<MdOutlineMailOutline/>} to={"https://mail.google.com/"} text = {"Inbox"}/>
            <DropdownItem img = {<IoIosSettings/>} to={"settings"} text = {"Settings"}/>
            <DropdownItem img = {<IoMdHelpCircle/>} to={"help"} text = {"Helps"}/>
            <DropdownItem logout={handleLogout} img = {<FiLogOut/>} text = {"Logout"}/>
          </span>
        </div>
        </div>
      </div>
      <button className="messages-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-message-circle"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>
    </div>
  );
};
function DropdownItem(props){
  return(
    <Link to={props.to} onClick={props.logout} className = 'dropdownItem'>
      <span>{props.img}</span>
      <p> {props.text} </p>
    </Link>
  );
}

export default Header;
