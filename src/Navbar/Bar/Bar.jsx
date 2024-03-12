import React, { useState, useEffect } from 'react'
import "./Bar.scss"
import {motion} from "framer-motion"
import ToggleButton from './ToggleButton/ToggleButton'
import Links from './Links/Links'

const Bar = () => {
  const [open , SetOpen] = useState(false)
  useEffect(() => {
    // Function to handle body overflow
    const handleBodyOverflow = () => {
      document.body.style.overflow = open ? 'hidden' : 'auto';
    };

    // Call the function when the component mounts
    handleBodyOverflow();

    // Cleanup function to reset body overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);
  const variants ={
      open:{
          clipPath:"circle(1800px at 10% -20%)",
          transition : {
              type:"spring",
              stiffness: 20,
          }
      },
      close:{
          clipPath:"circle(10px at 10% -20%)",
          transition:{
              delay:0.5,
              type:"spring",
              stiffness: 200,
              damping: 40,
          },
      },
  };
  return (
    <motion.div className='bar' animate={open ? "open" : "close"} >
      <motion.div className="bg" variants={variants} >
        <Links setOpen={SetOpen}/>
      </motion.div>
       <ToggleButton setOpen={SetOpen}/> 
    </motion.div>
  )
}

export default Bar
