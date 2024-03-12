import React from 'react'
import './Card.scss'
import {Link} from 'react-router-dom'
const Card_Box = ({id,image,course,description,price,offerPrice}) => {
  return (
    <>
    {/* <div className="project-box" style={{ backgroundColor: `bgColor` }}>
      <div className="project-box-header">
        <span>{id}</span>
        <div className="more-wrapper">
          <button className="project-btn-more">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-more-vertical"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>
      </div>
      <div className="project-box-content-header">
        <p className="box-content-header">{course}</p>
        <p className="box-content-subheader">{description.slice(0,50)}...</p>
      </div>
      <div className="box-progress-wrapper">
        <p className="box-progress-header">Progress</p>
        <div className="box-progress-bar">
          <span
            className="box-progress"
            style={{ width: `10%`, backgroundColor: `bgColor` }}
          ></span>
        </div>
        <p className="box-progress-percentage">{price}</p>
      </div>
      <div className="project-box-footer">
        <div className="participants">
          <button className="add-participant" style={{ color: `bgColor` }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-plus"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
        <Link to={`incourse/${id}`} className="days-left" style={{ color: `bgColor` }}>
         Enroll Now
        </Link>
      </div>
    </div> */}

    <div className="Course_card">
      <div className="course_image">
        <img src={image} alt={course} />
      </div>
      <div className="text_area">
        <h1>{course}</h1>
        <p>{description.slice(0, 90)}</p>
      </div>
      <div className="Course_button_link">
        <Link to={`incourse/${id}`}>View Course</Link>
      </div>
    </div>


    </>
  )
}

export default Card_Box
