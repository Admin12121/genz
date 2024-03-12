import React from "react";
import "./inner.scss";
import { Link } from "react-router-dom";
const Inner = () => {
  return (
    <>
      <div className="small_wrapper">
        <nav>
          <span>
            <img src="./logo.png" alt="" />
            <img className="sm" src="./Logo_text.png" alt="" />
          </span>
          <div className="links">
            <a href="/course">All Courses</a>
            <a href="/about">About Us</a>
            <a href="development">Development</a>
            <a href="/contact">Contact</a>
          </div>
          <span>
            <button className="buttonn">Login</button>
          </span>
        </nav>
        <div className="home_page_wrapper">
          <div className="home_text_wrapper">
            <h1>Learn what Matters</h1>
            <p>
            Confused on which course to take? Sipalaya have got you covered. Browse courses and find out the best course for you. 
            </p>
            <button className="buttonn">Explore Courses </button>
          </div>
          <div className="img_section">
            <img src="Students_3.jpg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Inner;
