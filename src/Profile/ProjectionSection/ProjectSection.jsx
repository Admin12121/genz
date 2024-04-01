import React, { useState, useEffect } from "react";
import Card_Box from "./Card_Box";
import { getToken} from "../../Fetch_Api/Service/LocalStorageServices";
import { useCourseQuery } from "../../Fetch_Api/Service/User_Auth_Api";
const ProjectsSection = () => {
  const { access_token } = getToken();
  const {
    data: Data,
    isSuccess: userSuccess,
    isError: userError,
  } = useCourseQuery({access_token});

  const [query, setQuery] = useState("")

  const handleInputchange = event =>{
    setQuery(event.target.value)
  }
  const filteritems = Data && Data.filter(Data => Data.name.toLocaleLowerCase().indexOf(query.toLocaleLowerCase())!== -1);
  
  function filteredData(Data,query){
    let filtereddata = Data;

    //filter_input_items
    if (query){
      filtereddata = filteritems;
    }

    return Data && filtereddata.map(({id,image,name,price,offerPrice}) => (
      <div key={Math.random()} className="project-box-wrapper">
      <Card_Box
        id={id}
        image={image}
        course={name}
        price={price}
        offerPrice={offerPrice}
      />
    </div>
      ));
      
}
 
const result = filteredData(Data, query);
  return (
    <div className="projects-section">
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
      </div>
      <div className="project-boxes jsGridView">
        {result}
      </div>
    </div>
  );
};

export default ProjectsSection;
