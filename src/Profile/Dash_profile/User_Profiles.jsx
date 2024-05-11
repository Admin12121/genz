import React, { useState, useEffect } from "react";
import {  useGetUserProfileQuery, useViewQuery } from "../../Fetch_Api/Service/User_Auth_Api";
import {useNavigate, useParams, Link } from 'react-router-dom';
import './UserProjects.scss'
import axios from "axios";

import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../../Components/Loader';
import Load from "../../Components/Load"
const User_Profiles = () => {
    const {username} = useParams();
    const [user,setUser] = useState()
    const [projectData, setprojectData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasmore, sethasMore] = useState(true)
    const [total, setTotal] = useState(0)
    const {
      data: userData,
      isSuccess: userSuccess,
      isError: userError,
    } = useGetUserProfileQuery({username});

    useEffect(() => {
      if (userData && userData.length > 0 && userData[0]) {
        setUser(userData[0]);
      }
    }, [userData ]); 

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`https://project.vickytajpuriya.com/user/projects/?name=${username}&page=${page}`);
              setprojectData(response.data.results);
              setTotal(response.data.count)
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };
  
      // Only fetch data if page is 1
      if (page === 1) {
          fetchData();
      }
  
  }, []);

  const fetchmore = async  () =>  {
      const response = await axios.get( 
          `https://project.vickytajpuriya.com/user/projects/?name=${username}&page=${page}`
      );
      setprojectData((prev) => {
          return [...prev, ...response.data.results];
      });
  }
  useEffect(()=>{
      if(page>1 ){
          fetchmore()
      }
  },[page])

  const fetchpage =() =>{
    if(projectData.length >= total){
      sethasMore(false)
    } else(
      setPage(prev => prev + 1)
    )
  }
  
  useEffect(() => {
    // Load initial project data
    loadProjectData();
  }, [projectData]);

  const loadProjectData = () => {
    if (projectData) {
      projectData.forEach(project => {
        updateIframeContent(project);
      });
    }
  };

  const updateIframeContent = (project) => {
    const iframeId = `iframe_${project.id}`;
    const iframe = document.getElementById(iframeId);
    
    if (iframe) {
      iframe.contentDocument.body.innerHTML = project.html_code + "<style>" + project.css_code + "</style>";
    }
  };

  return (
    <>
      <div  id="scrollableProjects"  className={`projects-section project-view`}  style={{padding:"10px 10px 0 10px"}}>
        <div className="profile_Image" style={{flexDirection:"column",gap:"20px"}}>
                  {user && <h1>{user.name}</h1>}
            <div className="image_wrapper">
            {user && <img src={`https://project.vickytajpuriya.com${user.userinfo.profile}`} alt={`${user.name}`} />}
            </div>
            <div className="user_info_wrapper">
              <span className="sett">
                  {user &&  <a href={`mailto:${user.email}`} style={{color:"var(--main-color)"}}>
                  <svg width="24px"  height="24px"  viewBox="0 0 24 24"  fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.9028 8.85114L13.4596 12.4642C12.6201 13.1302 11.4389 13.1302 10.5994 12.4642L6.11865 8.85114" stroke="var(--main-color)"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 11.5V8.57001C22 5.49883 19.9502 3 16.9089 3H7.09114C4.04979 3 2 5.49883 2 8.57001V15.4384C2 18.5095 4.04979 21.0084 7.09114 21H16.9089C19.9502 21.0084 22 18.5095 22 15.4384V15" stroke="var(--main-color)"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                    {user.email}</a>}
                  {user && user.userinfo.portfolio && <a href={user && user.userinfo.portfolio} target="_blank" style={{color:"var(--main-color)"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="group-hover:text-sky-500 transition-colors"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"></path></svg>
                    {user && user.userinfo.portfolio}</a>}
              </span>
            </div>
            <div className="user_per_info">
              <p>{user && user.userinfo.bio}</p>
            </div>
        </div>
        <div className="users_projects_section" style={{display: "flex", flexDirection:"column", gap: "50px"}}>
          <h1>Projects</h1>
          <div className="user_project_erapper" style={{display:"flex", flexWrap: "wrap", gap: "20px", justifyContent:"center"}}>
          {projectData &&  <InfiniteScroll
           dataLength={projectData.length}
           next={fetchpage}
           hasMore={hasmore}
           loader={<Data_loader/>}
           scrollableTarget="scrollableProjects"
           endMessage={
            <p style={{ textAlign: 'center', width: "100%", height: "50px" }}>
              <b>No more data</b>
            </p>
          }
         >
           {projectData.map((project, index) => (
             <ProjectCard key={`${project.id}_${index}`} project={project} />
           ))}
         </InfiniteScroll>}
          </div>
        </div>
      </div>
    </>
  )
}
const ProjectCard = ({ project }) => {
  const { id, username, project_title, profile, views, likes } = project;
  const navigate = useNavigate();
  return (
      <div className="Course_wrapper pro-course-wrapper" key={id}>
          <div className="Course_card proj-course-card">
              <div className="course_image pro-course-img">
                  <iframe id={`iframe_${id}`} frameBorder="0"></iframe>
                  <div onClick={() => navigate(`/code/${username}/${project_title}`)} className="iframe_link"></div>
              </div>
              <div className="text_area">
                  <span className="user-project">
                      <span>
                          <Link to={`/${username}`}>
                              <img src={`https://project.vickytajpuriya.com${profile}`} alt="" />
                          </Link>
                      </span>
                      <span>
                          <h1>{project_title}</h1>
                          <Link to={`/${username}`} style={{ color: "var(--main-color)" }}>
                              <p>{username}</p>
                          </Link>
                      </span>
                  </span>
                  <span className="project-view" style={{ gap: "10px" }}>
                      <p>{views} views</p>
                      <span className="project-star">
                          <svg width="15px" height="15px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                              <g id="Iconly/Light-Outline/Star" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                  <path d="M11.7499161,4.5 C11.6589161,4.5 11.4349161,4.525 11.3159161,4.763 L9.48991609,8.414 C9.20091609,8.991 8.64391609,9.392 7.99991609,9.484 L3.91191609,10.073 C3.64191609,10.112 3.54991609,10.312 3.52191609,10.396 C3.49691609,10.477 3.45691609,10.683 3.64291609,10.861 L6.59891609,13.701 C7.06991609,14.154 7.28391609,14.807 7.17191609,15.446 L6.47591609,19.456 C6.43291609,19.707 6.58991609,19.853 6.65991609,19.903 C6.73391609,19.959 6.93191609,20.07 7.17691609,19.942 L10.8319161,18.047 C11.4079161,17.75 12.0939161,17.75 12.6679161,18.047 L16.3219161,19.941 C16.5679161,20.068 16.7659161,19.957 16.8409161,19.903 C16.9109161,19.853 17.0679161,19.707 17.0249161,19.456 L16.3269161,15.446 C16.2149161,14.807 16.4289161,14.154 16.8999161,13.701 L19.8559161,10.861 C20.0429161,10.683 20.0029161,10.476 19.9769161,10.396 C19.9499161,10.312 19.8579161,10.112 19.5879161,10.073 L15.4999161,9.484 C14.8569161,9.392 14.2999161,8.991 14.0109161,8.413 L12.1829161,4.763 C12.0649161,4.525 11.8409161,4.5 11.7499161,4.5 M6.94691609,21.5 C6.53391609,21.5 6.12391609,21.37 5.77291609,21.114 C5.16691609,20.67 4.86991609,19.937 4.99891609,19.199 L5.69491609,15.189 C5.72091609,15.04 5.66991609,14.889 5.55991609,14.783 L2.60391609,11.943 C2.05991609,11.422 1.86491609,10.652 2.09491609,9.937 C2.32691609,9.214 2.94091609,8.697 3.69791609,8.589 L7.78591609,8 C7.94391609,7.978 8.07991609,7.881 8.14791609,7.743 L9.97491609,4.091 C10.3119161,3.418 10.9919161,3 11.7499161,3 L11.7499161,3 C12.5079161,3 13.1879161,3.418 13.5249161,4.091 L15.3529161,7.742 C15.4219161,7.881 15.5569161,7.978 15.7139161,8 L19.8019161,8.589 C20.5589161,8.697 21.1729161,9.214 21.4049161,9.937 C21.6349161,10.652 21.4389161,11.422 20.8949161,11.943 L17.9389161,14.783 C17.8289161,14.889 17.7789161,15.04 17.8049161,15.188 L18.5019161,19.199 C18.6299161,19.938 18.3329161,20.671 17.7259161,21.114 C17.1109161,21.565 16.3099161,21.626 15.6309161,21.272 L11.9779161,19.379 C11.8349161,19.305 11.6639161,19.305 11.5209161,19.379 L7.86791609,21.273 C7.57591609,21.425 7.26091609,21.5 6.94691609,21.5"
                                              id="Star"
                                              fill="var(--main-color)"
                                          ></path>
                                      </g>
                                  </svg>
                                  <p>star |</p>
                                  <p>{likes}</p>
                              </span>
                          </span>
                      </div>
                  </div>
      </div>
  );
};


const Data_loader = ({}) =>{
  return(
      <>
        <Load/>
         <Load/>
         <Load/>
         <span style={{width:"100%",    display: "flex", alignItems: "center", justifyContent: "center", height: "100px"}}> 
          <Loader />
         </span>
      </>
  )
}
export default User_Profiles
