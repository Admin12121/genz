import React, { useState, useEffect } from "react";
import Card_Box from "./Card_Box";
import { getToken } from "../../Fetch_Api/Service/LocalStorageServices";
import { useCourseQuery } from "../../Fetch_Api/Service/User_Auth_Api";
import { fetchDataWithRetry } from "../../Fetch_Api/Service/fetchwithRetry";
import Loader from "../../Components/Loader"
import Load from '../../Components/Load'
const ProjectsSection = () => {
  const { access_token } = getToken();
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState();

  async function fetchData() {
    try {
      const projectData = await fetchDataWithRetry(useCourseQuery, {
        access_token,
      });
      setData(projectData.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setLoading(true)
    } finally {
      setLoading(false); // Set loading state to false when data fetching is complete
    }
  }

  fetchData();
  const [query, setQuery] = useState("");

  const handleInputchange = (event) => {
    setQuery(event.target.value);
  };
  const filteritems =
    Data &&
    Data.filter(
      (Data) =>
        Data.name.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !== -1
    );

  function filteredData(Data, query) {
    let filtereddata = Data;

    //filter_input_items
    if (query) {
      filtereddata = filteritems;
    }
    return (
      Data &&
      filtereddata.map(({ id, image, name, price, offerPrice }) => (
        <div key={Math.random()} className="project-box-wrapper">
          <Card_Box
            id={id}
            image={image}
            course={name}
            price={price}
            offerPrice={offerPrice}
          />
        </div>
      ))
    );
  }
  const result = filteredData(Data, query);
  return (
    <div className="projects-section">
      <div className="projects-section-header mounter">
        <p>Tutorials</p>
        <div className="search-wrapper">
          <input
            className="search-input"
            value={query}
            type="text"
            onChange={handleInputchange}
            placeholder="Search"
          />
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
      </div>
        <div className="project-boxes jsGridView">
          {result ? result : <Skleton/>}
          </div>
    </div>
  );
};

const Skleton = () =>{
  return(
    <div style={{display: "flex",flexWrap: "wrap", gap:"100px"}}>
      <div className="Course_card">
        <div className="course_image">
        </div>
        <div className="text_area">
          <h1 style={{background:"var(--app-container)" ,width: "50%", height: "30px"}}></h1>
        </div>
        <div className="Course_button_link">
          <a style={{backgroundColor: "#9cd16b", color:"#9cd16b"}}>View Tutorials</a>
        </div>
    </div>
    <div style={{width:"20rem" ,height: "250px", display:"flex",justifyContent: "center"}}>
     <Loader/>
    </div>
    </div>
  )
}

export default ProjectsSection;
