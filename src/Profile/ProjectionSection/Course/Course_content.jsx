import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Demo from "./Trial_Video/Demo";
import ReactPlayer from "react-player";
import { formatTime } from "../../ProjectionSection/Course/Trial_Video/Format";
const CourseContent = ({ data }) => {
  // Check if data is an object and has the expected 'syllabi' property
  if (typeof data !== "object" || !data.hasOwnProperty("syllabi")) {
    return <p>No syllabus data available.</p>;
  }
  // Initialize state for each syllabus item
  const [isArrowVisible, setArrowVisible] = useState(
    Array(data.syllabi.length).fill(false)
  );

  const handleArrow = (index) => {
    setArrowVisible((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };



  const [video, setVideo] = useState(Array(data.syllabi.length).fill(false));

  const VideoClick = (index) => {
    setVideo((prev) => prev.map((value, i) => (i === index ? !value : value)));
  };

  // console.log(data.syllabi.map(({ nameof_syllabus1, coursedata_set }) => coursedata_set));
  return (
    <>
      <h1>Course content</h1>
      {data.syllabi.map(({nameof_syllabus1,coursedata_set},index) => (
          <div key={index} className="Cont_Topic">
            <div className="Topic_Title" style={{cursor:"pointer"}} onClick={() => handleArrow(index)}>
              <h1>{nameof_syllabus1}</h1>
              <IoIosArrowDown style={{transform: `rotate(${isArrowVisible[index] ? "-180deg" : "0deg"})`,transition: ".5s ease",}} />
            </div>
            {coursedata_set && coursedata_set.map(({ video_title, duration_minutes,duration_seconds }, dataIndex) => (
              <div key={dataIndex} className="Title_content" style={{ height: isArrowVisible[index] ? "40px" : "0", transition: "height .5s cubic-bezier(0.16, 1.11, 0.55, 1.21) 1.5s" }}>
                 <span style={{ borderTop: isArrowVisible[index] ? "1px solid #3d3d3d" : "", width: isArrowVisible[index] ? "100%" : "0%", height: isArrowVisible[index] ? "100%" : "0%", transition: `width 0.5s cubic-bezier(0.18, 0.88, 0.97, 1.01), height 0.5s cubic-bezier(0.19, 0.85, 0.1, 0.93)` }}>
                     <h1 onClick={() => VideoClick(index)}>{video_title}</h1>
            
                     <p className="time">{duration_minutes}:{duration_seconds}</p>

        </span>
    </div>
))}

          </div>
        )
      )}
    </>
  );
};

export default CourseContent;
