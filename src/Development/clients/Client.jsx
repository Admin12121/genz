import React,{useEffect,useState,useRef} from 'react'
import PropsCard from "./PropsCard";
import './style.scss'
import {motion} from 'framer-motion'
const Client = () => {
  const [width, setWidth] = useState(0)
  const caresol = useRef()
  useEffect(()=>{
    console.log(caresol.current.scrollWidth);
    setWidth(caresol.current.scrollWidth + 50 - caresol.current.offsetWidth )
  }, [])
  return (
    <>
      <div className="client_term clarty prop_wrapper_development " >
        <motion.div ref={caresol} whileTap={{cursor:"grabbing"}} className="Client_snap">
          <span>
          <h1>Testimonials</h1>
          <p>Don't take our word for it. Hear it form our happy clients</p>
          </span>
          <PropsCard width={width}/>
        </motion.div>
      </div>
    </>
  );
};

export default Client;
