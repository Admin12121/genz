import React,{useRef} from "react";
import "./Animation.scss";
import Social from "./Social/Social";
import { animate, useScroll, useTransform, motion } from "framer-motion";

const Animation = () => {
  
  const ref = useRef();

  const { scrollYProgress } = useScroll({target: ref,offset: ["start start", "end start"],});
  const yBg = useTransform(scrollYProgress, [1, 0], [0, 1]);
  const ytext = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  return (
    <>
      <div className="body-ani" ref={ref}>
        <div className="main-ani">
          <div className="iphonex">
            <div className="front">
              <div className="screen">
                <div className="screen__view">
                  {/* <!-- <div className="dribbbleLogo"><span></span></div> --> */}
                  <div className="loader_wrappeerr"></div>
                  <div className="hello">
                    <p>WelCome To</p>
                    <div className="logo">
                      <img src="logo.svg" alt="" />
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
                        <img src="Logo_text.svg" alt="" />
                      </motion.span>
                    </div>
                    <Social/>
                    {/* <img src="logo.png" alt="" /> */}
                    {/* <!-- <div className="dribbbleLogo white"><span></span></div> --> */}
                  </div>
                </div>
                <div className="screen__front">
                  <div className="screen__front-speaker"></div>
                  <div className="screen__front-camera"></div>
                </div>
              </div>
              <div className="front__line"></div>
              <div className="front__line front__line-second"></div>
            </div>
            <div className="phoneButtons phoneButtons-right"></div>
            <div className="phoneButtons phoneButtons-left"></div>
            <div className="phoneButtons phoneButtons-left2"></div>
            <div className="phoneButtons phoneButtons-left3"></div>
            <div className="back"></div>
          </div>

          <motion.div style={{y:ytext,opacity : yBg,transition: 'opacity .2s ease-in-out',}} className="title">
            <p>SiPALIYA</p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Animation;
