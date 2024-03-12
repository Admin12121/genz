import React from 'react'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate()
    const handleHome = () => {
      navigate('/');
      window.location.reload();
    }
  return (
    <>
    <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
        className={`Navbar_wrapper`}
      >
        <motion.div onClick={handleHome}
          className="logo"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, duration: 1 }}
        >
          <span className="logo">
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
          </span>
        </motion.div>
      </motion.div> 
    </>
  )
}

export default Header
