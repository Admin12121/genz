import React, { useState, useEffect } from 'react'
import { useParams,Link, Outlet } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import './Cour.scss'
import Video from './VIdeo/Video';
import { easing } from '@material-ui/core';
const Main_course = ({api}) => {
    const [Data, setData] = useState([]);
    const { courseId } = useParams();
    const [display,setDisplay] = useState([]);
    const [isArrowVisible, setArrowVisible] = useState([]);
    const [disp, setDisp] = useState(true)

    useEffect(() => {
      fetch(api + courseId)
        .then(response => response.json())
        .then(data => {setData(data); setDisplay(Array(data.syllabi.length).fill(false)); setArrowVisible(Array(data.syllabi.length).fill(false))})
        .catch(error => {
          console.error('Error fetching course data:', error);
        });
      }, [api, courseId]);

      const [windowWidth, setWindowWidth] = useState(window.innerWidth);
      const [handleWidth,setWidth] = useState(window.innerWidth)
      useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
          setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      if (Array.isArray(Data)) {
        // Display a loading state or handle the case where data is not an array
        return <h1>Loading...</h1>;
      }
      
      const handleArrow = (index) => {
        setArrowVisible((prev) =>
          prev.map((value, i) => (i === index ? !value : value))
        );
      };
    
      // Assuming data is an object with a 'course' property
      const { course,syllabi} = Data;

  const sidebarStyle = {
    width: disp && windowWidth < 1230 ? '70%' : '0%',
    height: disp && windowWidth < 1230 ? '97%' : '20%',
    top: disp && windowWidth < 1230 ? '2%' : '35%',
    padding: disp && windowWidth < 1230 ? '' : '5px',
    left: disp && windowWidth < 1230 ? '10px' : '0px',
  };
    
  return (
    <>
      <div className="project_course_section mtrt">
        <div  style={ handleWidth < 1230 ? sidebarStyle : {width:"30%"}} className="Course_title_wrapper">
          <div style={{display: `${disp ? "grid" : "none"}`,visibility: `${disp ? " visible" : "hidden"}`, opacity: `${disp ? 1 : 0}`, transition: `${disp ? "opacity 0.5s ease-in-out" : "opacity 0.5s ease-in-out, visibility 0s 0.5s"}`, }} className="txt_syllabus">
          <h1>{course}</h1>
        {Data.syllabi.map(({ nameof_syllabus1,coursedata_set}, index) => (
        <div key={index} className="Cont_Topic">
          <div className="Topic_Title"  onClick={() => handleArrow(index)}>
            <h1>{nameof_syllabus1}</h1>
            <IoIosArrowDown style={{fontSize:'15px',position:'absolute',top:'0',right:"0",transform: `rotate(${isArrowVisible[index] ? "-180deg" : "0deg"})`,transition: ".5s ease",}}/>
          </div>
          {coursedata_set && coursedata_set.map(({id, video_title, duration_minutes,duration_seconds }, dataIndex) => (
            <div key={dataIndex} className="Title_content" style={{ height: isArrowVisible[index] ? "40px" : "0", transition: "height .5s cubic-bezier(0.16, 1.11, 0.55, 1.21) 1.5s" }}>
            <span style={{ borderTop: isArrowVisible[index] ? "1px solid #3d3d3d" : "", width: isArrowVisible[index] ? "100%" : "0%", height: isArrowVisible[index] ? "100%" : "0%", transition: `width 0.5s cubic-bezier(0.18, 0.88, 0.97, 1.01), height 0.5s cubic-bezier(0.19, 0.85, 0.1, 0.93)` }}>
              <Link to={`${id}`}><h1 >{video_title.slice(0,45)}...</h1></Link>
              <p className="time">{duration_minutes}:{duration_seconds}</p>
            </span>
          </div>
))}
        </div>
        
      ))}
          </div>
          <span className='arr' onClick={()=>{setDisp(prev => !prev)}} style={{transform:`rotate(${disp ? "180deg" : "0deg"})`,position:`${disp ? "" : "absolute" }`,left:`${disp ?  "" : "1px"}`}}>{">"}</span>
        </div>
        <div className="Cont_Course_info">
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default Main_course
