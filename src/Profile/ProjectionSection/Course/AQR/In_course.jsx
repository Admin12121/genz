{/*import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Cour.scss";
import Course_content from "../Course_content";
import { useParams } from 'react-router-dom';
import Payment from "./Payment_Card/Payment";
import Demo from "../Trial_Video/Demo";
import Load from "../../../../Components/Load";
import logo from './logo.png'
import { FaPlay } from "react-icons/fa6";

const In_course = ({ api }) => {
  const [Data, setData] = useState([]);
  const { courseId } = useParams();  
  const [play, setplay] = useState(false)

  useEffect(() => {
    fetch(api + courseId)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }, [api, courseId]);


  useEffect(()=>{
    const [video, setVideo] = useState({
      video: "",
      video_title: "",
    });
    
    const firstSyllabus = Data.syllabi[0];
    
    if (firstSyllabus && Array.isArray(firstSyllabus.coursedata_set) && firstSyllabus.coursedata_set.length > 0) {
      const { video, video_title } = firstSyllabus.coursedata_set[0];
    
      // Updating state using setVideo
      setVideo({
        video,
        video_title,
      });
    } else {
      console.log('Data structure does not match the expected format.');
    }
    
  },[])
  // Check if data is an object and not an array
  if (Array.isArray(Data)) {
    // Display a loading state or handle the case where data is not an array
    return <Load/>;
  }
  // Assuming data is an object with a 'course' property
  const { instructor,course, image, offerPrice, price ,id} = Data;
  return (
    <div className="projects-section core">
      <div className="Course_OverView">
        <h1>{course}</h1>
        <div className="Course_Image">
          <img src={image} alt={course} />
          <span>
            <img src={logo} alt="" />
          </span>
          <div onClick={()=>{setplay(prev=>!prev)}} className="play_wra">
          <FaPlay/>
          </div>
        </div>
        <div className="course_link">
          <Link to="">About Course</Link>
          <Link to="QA">Q & A</Link>
          <Link to="review">Reviews</Link>
        </div>
        <div>
        </div>
        <Outlet />
        <Course_content data={Data} />
      </div>
      <div style={{display:`${play ? "flex" : "none"} `}} className="demoVideo_wrapper">
      <Demo />
      </div>
      <Payment instructor={instructor.name} course={course} id={id} offerPrice={offerPrice} price={price}/>
      </div>
      );
    };
    
    export default In_course;
  */}
  {/* <Demo video_1={Data.video}  cor={Data.video_title}/> */}

import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Cour.scss";
import Course_content from "../Course_content";
import { useParams } from 'react-router-dom';
import Payment from "./Payment_Card/Payment";
import Demo from "../Trial_Video/Demo";
import Load from "../../../../Components/Load";
import logo from './logo.png'
import { FaPlay } from "react-icons/fa6";

const In_course = ({ api }) => {
  const [Data, setData] = useState([]);
  const { courseId } = useParams();  
  const [play, setplay] = useState(false);

  // Move these hooks to the top-level scope
  useEffect(() => {
    fetch(api + courseId)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }, [api, courseId]);

  useEffect(() => {
    const firstSyllabus = Data.syllabi && Data.syllabi.length > 0 ? Data.syllabi[0] : null;

    if (firstSyllabus && Array.isArray(firstSyllabus.coursedata_set) && firstSyllabus.coursedata_set.length > 0) {
      const { video, video_title } = firstSyllabus.coursedata_set[0];

      // Updating state using setVideo

    } else {
      
    }
  }, [Data]); // Ensure you have Data as a dependency

  // Check if data is an object and not an array
  if (Array.isArray(Data)) {
    // Display a loading state or handle the case where data is not an array
    return <Load/>;
  }

  // Assuming data is an object with a 'course' property
  const { instructor, course, image, offerPrice, price, id ,video} = Data;

  return (
    <div className="projects-section core">
      <div className="Course_OverView">
        <h1>{course}</h1>
        <div className="Course_Image">
          <img src={image} alt={course} />
          <span>
            <img src={logo} alt="" />
          </span>
          <div onClick={()=>{setplay(prev=>!prev)}} className="play_wra">
          <FaPlay/>
          </div>
        </div>
        <div className="course_link">
          <Link to="">About Course</Link>
          <Link to="QA">Q & A</Link>
          <Link to="review">Reviews</Link>
        </div>
        <div>
        </div>
        <Outlet />
        <Course_content data={Data} />
      </div>
      <div style={{display:`${play ? "flex" : "none"} `}} className="demoVideo_wrapper">
      <Demo video_1={video} cor={course}/>
      <span  onClick={()=>{setplay(prev=>!prev)}} className="splitter" >✖️</span>
      </div>
      <Payment instructor={instructor.name} course={course} id={id} offerPrice={offerPrice} price={price}/>
      </div>
  );
};

export default In_course;
