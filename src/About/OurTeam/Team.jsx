import React, { useState } from "react";
import "./Team.scss";

const Team = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const data = [
    {
      img: "./HIMAL.jpg",
      namee: "Er.Himal Rawal",
      position: "CEO & Founder",
      field: "Senior Full Stack Developer",
    },
    {
      img: "Sunam.jpg",
      namee: "Er. Suman Tamang",
      position: "CTO",
      field: "Graphic Designer",
      field1: "Python developer"
    },
    {
      img: "Madan.jpg",
      namee: "Madan Bista",
      position: "Manager",
      field: "",
    },
    {
      img: "anish.png",
      namee: "Er.Anish Bista",
      position: "Technical Lead",
      field: "Senior Full Stack Developer",
    },
  ];

  return (
    <>
      <div className="Team_cont">
        <div className="Our_Team">
          <h1>Our Team</h1>
        </div>
        <div className="team_container">
          {data.map(({ img, namee, position, field, field1 }, index) => (
            <div
              key={index}
              className={`team teamm ${
                hoveredIndex === index ? "hovered" : ""
              }`}
              style={{
                backgroundImage: `url("${img}")`,
                backgroundPosition:
                  hoveredIndex === index ? "left center" : "center center",
                backgroundRepeat: "no-repeat",
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="border">
                <h2 style={{ opacity: hoveredIndex === index ? 1 : 0 }}>
                  {namee}
                </h2>
                <div
                  className="icons"
                  style={{ opacity: hoveredIndex === index ? 1 : 0 }}
                >
                  <p>{position}</p>
                  <p>{field}</p>
                  {field1 && <p>{field1}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Team;
