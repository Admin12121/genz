import React, {useState, useEffect} from "react";
import "./Courses.scss";
// import Data from "../data/Data";
import Card from './Card/Card'
import Login_Card from "../Components/Login_Card";

const Courses = ({api}) => {
      //input filter
  const [query, setQuery] = useState("")
  const [Data, setData] = useState([])
const [close,setClose] = useState(false)
  useEffect(()=>{
    fetch(api)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(err => console.log(err))
  }, [])

  const handleInputchange = event =>{
    setQuery(event.target.value)
  }
    //handle input filter
    
    const filteritems = Data.filter(Data => Data.course.toLocaleLowerCase().indexOf(query.toLocaleLowerCase())!== -1);
       
    function filteredData(Data,query){
      let filtereddata = Data;
  
      //filter_input_items
      if (query){
        filtereddata = filteritems;
      }
  
      return filtereddata.map(({image, course,description}) => (
          <Card
          key={Math.random()}
          img={image}
          title={course}
          desc={description}
          close={setClose}
          />
        ));
  }


    const result = filteredData(Data,query);

  return (
    <>
      <div id="cu">
        <div className="Courses">
          <div className="Courses_header">
            <h1>Available Courses</h1>
            <p>
              Check out our current course offerings and stay tuned for more to
              come!
            </p>
            <div className="input-wrapper">
              <button className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="25px"
                  width="25px"
                >
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    stroke="#000"
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                  ></path>
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    stroke="#000"
                    d="M22 22L20 20"
                  ></path>
                </svg>
              </button>
              <input
                placeholder="search.."
                className="input"
                name="text"
                type="text"
                value={query}
                onChange={handleInputchange}
              />
            </div>
          </div>
          <div className="courses_box">
          {result}
          </div>
        </div>
      </div>
      <Login_Card close={close} setclose={setClose}/>
    </>
  );
};

export default Courses;
