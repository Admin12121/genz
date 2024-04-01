import React from 'react'
import './Card.scss'
import {Link} from 'react-router-dom'
const Card_Box = ({image,course}) => {
  let name = course;
  return (
    <>
    <div className="Course_card">
      <div className="course_image">
        <img src={`https://project.vickytajpuriya.com/${image}`} alt={course} />
      </div>
      <div className="text_area">
        <h1>{course}</h1>
        {/* <p>{description.slice(0, 90)}</p> */}
      </div>
      <div className="Course_button_link">
        <Link to={`${course}`}>View Course</Link>
      </div>
    </div>


    </>
  )
}

export default Card_Box
