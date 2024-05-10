import React from 'react'
import './Card.scss'
import {Link} from 'react-router-dom'
const Card_Box = ({image,course}) => {
  
  return (
    <>
    <div className="Course_card">
      <div className="course_image">
        <img src={`${import.meta.env.VITE_KEY_BACKEND_DOMAIN}/${image}`} alt={course} />
      </div>
      <div className="text_area">
        <h1>{course}</h1>
      </div>
      <div className="Course_button_link">
        <Link to={`${course}`} style={{backgroundColor: "#9cd16b"}}>View Tutorial</Link>
      </div>
    </div>


    </>
  )
}

export default Card_Box
