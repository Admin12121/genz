import React from 'react'
import './Desc.scss'
import Button from '../../Components/Button'
import {Link} from "react-router-dom"
const data =[
    {
        img:"./hoc-lap-trinh.png",
        title:"Immersive Sessions",
        desc:"You don't just learn online, you get to build things alongside your mentor. It's an interactive, immersive, hands-on classroom experience"
    },
    {
        img:"./thi-lap-trinh.png",
        title:"Get Mentored By Bigshots",
        desc:"Learn from the best in the field and we are not just saying that. Your mentors are all experienced professionals in the fields they teach."
    },
    {
        img:"./luyen-lap-trinh.png",
        title:"Building Your Portfolio ",
        desc:"We don't believe in just training you and leaving you be. Our mentors will help you build a portfolio and help you with setbacks even after you've finished learning."
    }
]
const Description = () => {
  return (
    <>
    <div className="Learn_wrapper">
        <div className="Learn_text">
        <h1>Why SiPALAYA</h1>
        </div>

        <div className="Card_box_wrapper">
            {data.map(({img,title,desc})=>(

            <div className="card_box" key={Math.random()}>
                <span>
                <img src={img} alt="" />
                </span>
                <div className="box_text">
                    <h1>{title}</h1>
                    <p>{desc}</p>
                </div>
            </div>
            ))}

        </div>
        <p>Internship Guarantee Diploma IT Courses For Physical / Online Training</p>
        <Link to="admission">
        <Button text="Admission Form →"/>
        </Link>
        </div>      
    </>
  )
}

export default Description
