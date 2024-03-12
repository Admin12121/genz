import React,{useRef} from "react";
import './Dev.scss'
import { animate, useScroll, useTransform, motion } from "framer-motion";

const DevHome = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({target: ref,offset: ["start start", "end start"],});
  const yBg = useTransform(scrollYProgress, [1, 0], [0, 1]);
  const ytext = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <>
      <motion.div className="main_devlopment_wrapper" ref={ref}>
        <div className="text_main_wrapper">
        <motion.h1 initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50 }}>We Provide Exceptional IT Services </motion.h1>
        <p style={{color:'#fff'}}>Leverage the new technology. Take a new approach to scale & transform your business digitally</p>
        <span className="button">
        <button>+Book a Meeting</button> 
        <button id='btrnt'>Get in touch</button> 
        </span>
        <motion.div initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50 }} style={{y:ytext,transition: 'opacity .2s ease-in-out',}} className="devlopment_img_wrapper">
        <img src="./terminal.png" alt="terminal" />
        <div className="mpsrt"></div>
        </motion.div>
        </div>
      </motion.div>
    </>
  )
}

export default DevHome
