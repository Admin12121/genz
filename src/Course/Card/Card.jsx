import React from "react";
import Button from "../../Components/Button";

const Card = ({img,title,desc,close}) => {
const handleclosev =()=>{
  if(close){
    close(true)
  }
}
  return (
    <>
      <div className="main_box_wrapper">
        <div className="image_box_wrapper">
          <img src={img} alt={img} />
        </div>
        <div className="courses_text_wrapper">
          <span>
            <h1>{title}</h1>
            <p>{desc.slice(0, 100)}...</p>
          </span>
          <div onClick={handleclosev}>
          <Button  text="Enroll now →" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
