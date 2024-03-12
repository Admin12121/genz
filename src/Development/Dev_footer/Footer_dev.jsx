import React from "react";
import "./fotter.scss";
import {Link} from "react-router-dom"
import { motion } from "framer-motion";
const Footer_dev = () => {
  
  return (
    <>
    
      <div className="dev_foter">
        <div className="recipe-container">
 
              <motion.div
                className="logo"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, duration: 1 }}
              >
                <Link to="">
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

            <h1>Leverage the new Technology. Take a new approach to scale & transform your business digitally</h1>
            <p></p>
            <button>Get in touch</button>
        </div>
      </div>
    </>
  );
};

export default Footer_dev;
