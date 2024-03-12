import React from "react";
import Mac from "./Three/Mac";
import "./Intro.scss";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import Animation from "./Animation - 1702810226535.json";
import Button from "../../Components/Button";
import {motion} from 'framer-motion'

const Intro = () => {
  return (
    <>
      <div className="Home_frist_page">
        <motion.div className="Home_text_wrapper">
          <motion.h1 >Become a Tech Professional</motion.h1>
          <p>
            Ready to begin your journey in the world of tech? We are here to
            help you throughout the path of becoming a tech professional and
            explore the various possibilities of innovation and success. Watch
            Videos and take Live classes, go through detailed examples, and try
            the code yourself. Take the lead in the world of tech with Sipalaya.
          </p>
          <span className="Home_but">
            {/* <Link to="course">
              <Button text="Explore Courses →" />
            </Link> */}
            <Link className="AdminHome_button" to="admission">
              <button className="learn-more">
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Admission Form</span>
              </button>
            </Link>
          </span>
        </motion.div>
        <div className="mobile_display">
          <Lottie className="imagee" animationData={Animation} />
        </div>
        <div className="home_wrapper">
          <Mac />
        </div>
      </div>
    </>
  );
};

export default Intro;
