import React, { useState ,useEffect} from "react";
import "./Students.scss";
const Students = () => {
  const [Data, setData] =useState([])
  const api =  "http://127.0.0.1:8000/sipalaya/students/"
  useEffect(()=>{
    fetch(api)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(err => console.log(err))
  }, [])
  return (
    <>
      <div className="students_Prog">
        <h1>Achievements of our Students</h1>
        <div className="Students_card_wrapper">
        {Data.map(({id, name,profile,Company_Logo,Company_Name,position,Course_enroll})=>(
        <article key={id} className="students_card card--1" >
          <div className="card__info-hover"></div>
          <div className="card__image" style={{backgroundImage:`url('${Company_Logo}')`}}></div>
          <a className="card_link">
            <div className="card__img--hover" style={{backgroundImage:`url('${Company_Logo}')`}}>
            <img className="marty" src={profile} alt="" />
            </div>
            <img className="martyr" src={profile} alt="" />
          </a>
          <div className="card__info">
            <span className="card__category">{name}</span>
            <h3 className="card__title">Got a job in {Company_Name}</h3>
            <span className="card__by">as a 
            <a href="" className="card__author" title="author">
                {position}
              </a>
            </span>
          </div>
        </article>
        ))}
        </div>
      </div>
    </>
  );
};

export default Students;
