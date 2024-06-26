import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {motion} from "framer-motion"
const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(localStorage.getItem('activeLink') || '');

  // Update the localStorage when activeLink changes
  useEffect(() => {
    localStorage.setItem('activeLink', activeLink);
  }, [activeLink]);

  const handleLinkClick = (to) => {
    setActiveLink(to);
  };
  return (
    <div className="app-sidebar">
      <motion.span transition={{type:"spring" , stiffness:"200"}} whileHover={{scale:1.3}} whileTap={{scale:0.83}}>
      <Link to='/code' onClick={()=> handleLinkClick("")} className={`app-sidebar-link ${activeLink === '' ? 'active' : ''}`}>
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
          className="feather feather-home"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </Link>
      </motion.span>
      <motion.span transition={{type:"spring" , stiffness:"200"}} whileHover={{scale:1.3}} whileTap={{scale:0.83}}>
      <Link to="courses" onClick={()=> handleLinkClick("courseses")} className={`app-sidebar-link ${activeLink === 'courseses' ? 'active' : ''}`}>
        <svg
          className="link-icon feather feather-pie-chart"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <defs />
          <path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" />
        </svg>
      </Link>
      </motion.span>
      <motion.span transition={{type:"spring" , stiffness:"200"}} whileHover={{scale:1.3}} whileTap={{scale:0.83}}>
      <Link to='project' onClick={()=> handleLinkClick("project")} className={`app-sidebar-link ${activeLink === 'project' ? 'active' : ''}`}>
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
          className="feather feather-calendar"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </Link>
      </motion.span>
      <motion.span transition={{type:"spring" , stiffness:"200"}} whileHover={{scale:1.3}} whileTap={{scale:0.83}}>
      <Link to="settings" onClick={()=> handleLinkClick("settings")} className={`app-sidebar-link ${activeLink === 'settings' ? 'active' : ''}`}>
        <svg
          className="link-icon feather feather-settings"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <defs />
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      </Link>
      </motion.span>
    </div>
  );
};

export default Sidebar;
