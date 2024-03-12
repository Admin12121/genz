import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Load from "../../../../Components/Load";

const About_Course = ({api}) => {
  const [Data, setData] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    fetch(api + courseId)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }, [api, courseId]);

  if (Array.isArray(Data)) {
    // Display a loading state or handle the case where data is not an array
    return <Load/>;
  }
  const { course, description,whatyouwilllearn, offerPrice, price } = Data;
  return (
    <>
        <div className="Des_Course fix_width" key={course}>
          <h1>Introduction to {course}</h1>
          <p>{description}</p>
          <span>
          <h2>What you'll Learn </h2>
          <p style={{ whiteSpace: 'pre-line' }}>
          {whatyouwilllearn}
          </p>
          {/* <div dangerouslySetInnerHTML={{ __html: points }} /> */}
          </span>
          
          </div>
    </>
  );
}

export default About_Course;
