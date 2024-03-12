import React, { useState, useEffect } from "react";
import {getCourse} from '../../Fetch_Api/Service/LocalStorageServices'
import Card_Box from "./Course/Card_Box";
import {Link} from "react-router-dom";

const ProjectsSection = ({api}) => {
  const [Data, setData] = useState([])

  useEffect(()=>{
    fetch(api)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(err => console.log(err))
  }, [])
  const [finaldata, setFinaldata] = useState([])
  useEffect(() => {
    const user = getCourse();
    const dalta = user ? JSON.parse(user) : [];
    setFinaldata(dalta);
    
    if (finaldata && finaldata.length > 0) {
      const courseId = finaldata[0]?.active_course;
      if (courseId) {
        console.log("Fetching course details for courseId:", courseId);
        fetchCourseDetails(courseId);
       
      } else {
        console.log("No active course found");
      }
    } else {
      console.log("No active course found");
    }
  }, []); 

  const renderCourseDetails = (courseId) => {
    const course = Data.find(
      (courseDetail) => courseDetail.id === courseId
    );
    
    if (course) {
      return (
        <div className="Course_wrapper" key={course.id}>
          {/* <h2>{course.course}</h2> */}
          <div className="Course_card">
            <div className="course_image">
              <img src={course.image} alt={course.course} />
            </div>
            <div className="text_area">
              <h1>{course.course}</h1>
            </div>
            <div className="Course_button_link">
              <Link to={`/profile/${course.id}`}>Enroll now</Link>
            </div>
          </div>
        </div>
      );
    }
    else{
      return(
        <div>
          
        </div>
      )
    }

    return null;
  };


  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);

  useEffect(() => {
    const month = new Date().toLocaleString("default", { month: "long" });
    setCurrentMonth(month);
    const day = new Date().getDate();
    setCurrentDay(day);

  }, []);

  const [query, setQuery] = useState("")

  const handleInputchange = event =>{
    setQuery(event.target.value)
  }
  const filteritems = Data.filter(Data => Data.course.toLocaleLowerCase().indexOf(query.toLocaleLowerCase())!== -1);
  
  function filteredData(Data,query){
    let filtereddata = Data;

    //filter_input_items
    if (query){
      filtereddata = filteritems;
    }

    return filtereddata.map(({id,image,course,description,price,offerPrice}) => (
      <div key={Math.random()} className="project-box-wrapper">
      <Card_Box
        id={id}
        image={image}
        course={course}
        description={description}
        price={price}
        offerPrice={offerPrice}
      />
    </div>
      ));
      
}
 
const result = filteredData(Data,query);
  return (
    <div className="projects-section">
      {finaldata && finaldata.length > 0 ? (
        <>
          <div className="projects-section-header">
            <p>Active Course</p>
            <p className="time">
              {currentMonth}, {currentDay}
            </p>
          </div>

          <div className="project-boxes jsGridViews active-course">
            {/* {finaldata.map(({course,description,id,image}, index) => (
              <div key={index} className="project-box-wrapper">
                <Card_Box
                    id={id}
                    image={image}
                    course={course}
                    description={description}
                />
              </div>
            ))} */}
            {/* {renderCourseDetails(course.active_course)} */}
            {
              finaldata?.map((course)=>(
                <div key={course.active_course}>
                {renderCourseDetails(course.active_course)}
              </div>
              ))
            }
          </div>
        </>
      ) : (
        <div>
        
        </div>
      )}

      <div className="projects-section-header mounter">
        <p>Courses</p>
        <div className="search-wrapper">
          <input className="search-input" value={query} type="text" onChange={handleInputchange} placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="feather feather-search"
            viewBox="0 0 24 24"
          >
            <defs></defs>
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
        </div>
          {/* <p className="time">{currentMonth}, {currentDay}</p> */}
      </div>
      <div className="project-boxes jsGridView">
        {result}
      </div>
    </div>
  );
};

export default ProjectsSection;
