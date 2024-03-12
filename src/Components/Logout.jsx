import React from 'react'
import {motion} from "framer-motion"

const style ={
  cursor: "pointer"
}

const Logout = ({text,handleLogout}) => {
  return (
    <>
          <motion.button className="Profile_Logout" style={style} onClick={handleLogout} initial={{scale:0}} animate={{scale:1}} transition={{type:"spring", stiffness:100}} whileTap={{scale:0.9}} whileHover={{scale:1.1}}>{text}</motion.button>

    </>
  )
}

export default Logout
