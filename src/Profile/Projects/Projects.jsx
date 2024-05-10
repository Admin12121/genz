import React, { useState, useEffect } from "react";
import "./Editor.scss";
import "./create.scss";
import { useNavigate, Link } from 'react-router-dom';
import {toast } from 'sonner';
import { useGetLoggedUserQuery,useProjectsMutation } from "../../Fetch_Api/Service/User_Auth_Api";


const Projects = () => {
  const [project, setproject] = useState(false);
  const [projects, { isLoading }] = useProjectsMutation();
  const navigate = useNavigate();
  const [server_error, setServerError] = useState('');
  
  const {
    data: userData,
    isSuccess: userSuccess,
    isError: userError,
    refetch
  } = useGetLoggedUserQuery();
  useEffect(() => {
    refetch();
  }, [navigate]);
  useEffect(() => {
    loadProjectData(userData);
  }, [userData]);

  const loadProjectData = (userData) => {
    if (userData && userData.projects) {
      userData.projects.forEach(project => {
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


  const HandleProjectSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = { 
      user: userData.id,
      project_title: data.get("project_title"),
      project_type: data.get("project_type"),
      description: data.get("project_description"),
      html_code:  `<!DOCTYPE html>
      <html lang="en">
      
      <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <title>Document</title>
      </head>
        <body>
          <div class="loader"></div>
        </body>
      </html>`,
      css_code: `
      *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body{
        width: 100%;
        height: 100%;
        display: flex;   
        align-items: center;
        justify-content: center;
      }

      .loader {
        width: 48px;
        height: 48px;
        margin: auto;
        position: relative;
      }
      
      .loader:before {
        content: '';
        width: 48px;
        height: 5px;
        background: #999;
        position: absolute;
        top: 60px;
        left: 0;
        border-radius: 50%;
        animation: shadow324 0.5s linear infinite;
      }
      
      .loader:after {
        content: '';
        width: 100%;
        height: 100%;
        background: rgb(61, 106, 255);
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 4px;
        animation: jump7456 0.5s linear infinite;
      }
      
      @keyframes jump7456 {
        15% {
          border-bottom-right-radius: 3px;
        }
      
        25% {
          transform: translateY(9px) rotate(22.5deg);
        }
      
        50% {
          transform: translateY(18px) scale(1, .9) rotate(45deg);
          border-bottom-right-radius: 40px;
        }
      
        75% {
          transform: translateY(9px) rotate(67.5deg);
        }
      
        100% {
          transform: translateY(0) rotate(90deg);
        }
      }
      
      @keyframes shadow324 {
      
        0%,
          100% {
          transform: scale(1, 1);
        }
      
        50% {
          transform: scale(1.2, 1);
        }
      }`,
      js_code: '',
    };

    try {
      const res = await projects({actualData});
      if (res.data) {
        setproject((prev) => !prev);
        toast.success(`${actualData.project_title} Created`);
        refetchUser();
        document.getElementById('project_formrt').reset();
      }
      if (res.error){
        setServerError(res.error.data.error);
      }
    } catch (error) {
      console.log('errr');
    }
  };

  return (
    <>
      <div className={`projects-section project-view`} >
      <div className="Course_wrapper pro-course-wrapper" style={{justifyContent:"center"}}>
      <label
          className="custum-file-upload"
          onClick={() => {
            setproject((prev) => !prev);
          }}
          htmlFor="file"
        >
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
              <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                id="SVGRepo_tracerCarrier"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </g>
            </svg>
          </div>
          <div className="texter">
            <span>Click to Create New Project</span>
          </div>
        </label>
      </div>
        {userData ? userData.projects.map(({id,username,profile,views,likes,project_title,project_type},index)=>(
        <div className="Course_wrapper pro-course-wrapper" key={index}>
        <div className="Course_card proj-course-card">
          <div className="course_image pro-course-img">
            <iframe  id={`iframe_${id}`} frameBorder="0"></iframe>
            <div onClick={() => navigate(`/code/${username}/${project_title}`)}  className="iframe_link"></div>
          </div>
          <div className="text_area">
              <span className="user-project">
                  <span>
                    <Link to={`/${username}`}>
                      <img src={`${import.meta.env.VITE_KEY_BACKEND_DOMAIN}${profile}`} alt="" />
                    </Link>
                  </span>
                  <span>
                    <h1>{project_title}</h1>
                    <Link to={`/${username}`} style={{color:"var(--main-color)"}}>
                    <p>{username}</p>
                    </Link>
                  </span>
              </span>
              <span className="project-view" style={{gap:"10px"}}>
                <p>{views} views</p>
                <span className="project-star">
                      <svg width="15px"  height="15px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <g id="Iconly/Light-Outline/Star" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              <path d="M11.7499161,4.5 C11.6589161,4.5 11.4349161,4.525 11.3159161,4.763 L9.48991609,8.414 C9.20091609,8.991 8.64391609,9.392 7.99991609,9.484 L3.91191609,10.073 C3.64191609,10.112 3.54991609,10.312 3.52191609,10.396 C3.49691609,10.477 3.45691609,10.683 3.64291609,10.861 L6.59891609,13.701 C7.06991609,14.154 7.28391609,14.807 7.17191609,15.446 L6.47591609,19.456 C6.43291609,19.707 6.58991609,19.853 6.65991609,19.903 C6.73391609,19.959 6.93191609,20.07 7.17691609,19.942 L10.8319161,18.047 C11.4079161,17.75 12.0939161,17.75 12.6679161,18.047 L16.3219161,19.941 C16.5679161,20.068 16.7659161,19.957 16.8409161,19.903 C16.9109161,19.853 17.0679161,19.707 17.0249161,19.456 L16.3269161,15.446 C16.2149161,14.807 16.4289161,14.154 16.8999161,13.701 L19.8559161,10.861 C20.0429161,10.683 20.0029161,10.476 19.9769161,10.396 C19.9499161,10.312 19.8579161,10.112 19.5879161,10.073 L15.4999161,9.484 C14.8569161,9.392 14.2999161,8.991 14.0109161,8.413 L12.1829161,4.763 C12.0649161,4.525 11.8409161,4.5 11.7499161,4.5 M6.94691609,21.5 C6.53391609,21.5 6.12391609,21.37 5.77291609,21.114 C5.16691609,20.67 4.86991609,19.937 4.99891609,19.199 L5.69491609,15.189 C5.72091609,15.04 5.66991609,14.889 5.55991609,14.783 L2.60391609,11.943 C2.05991609,11.422 1.86491609,10.652 2.09491609,9.937 C2.32691609,9.214 2.94091609,8.697 3.69791609,8.589 L7.78591609,8 C7.94391609,7.978 8.07991609,7.881 8.14791609,7.743 L9.97491609,4.091 C10.3119161,3.418 10.9919161,3 11.7499161,3 L11.7499161,3 C12.5079161,3 13.1879161,3.418 13.5249161,4.091 L15.3529161,7.742 C15.4219161,7.881 15.5569161,7.978 15.7139161,8 L19.8019161,8.589 C20.5589161,8.697 21.1729161,9.214 21.4049161,9.937 C21.6349161,10.652 21.4389161,11.422 20.8949161,11.943 L17.9389161,14.783 C17.8289161,14.889 17.7789161,15.04 17.8049161,15.188 L18.5019161,19.199 C18.6299161,19.938 18.3329161,20.671 17.7259161,21.114 C17.1109161,21.565 16.3099161,21.626 15.6309161,21.272 L11.9779161,19.379 C11.8349161,19.305 11.6639161,19.305 11.5209161,19.379 L7.86791609,21.273 C7.57591609,21.425 7.26091609,21.5 6.94691609,21.5" id="Star" fill="var(--main-color)" ></path>
                          </g>
                      </svg>
                      <p>star |</p>
                <p>{likes.length}</p>
                </span>
              </span>
          </div>
        </div>
      </div>
        )) : ''}
        <div
          className="project-container"
          style={{ display: `${project ? "flex" : "none"}` }}
        >
          <form id="project_formrt" className="modal" onSubmit={HandleProjectSubmit}>
            <div className="modal__header">
              <span className="modal__title">New project</span>
              <span
                onClick={() => {
                  setproject((prev) => !prev);
                }}
                className="button button--icon"
              >
                <svg
                  width="24"
                  viewBox="0 0 24 24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                </svg>
              </span>
            </div>
            <div className="modal__body">
              <div className="input" >
                <label className="input__label">Project title</label>
                <input name="project_title" className="input__field" type="text" style={{border:`${server_error ? "1px solid red" : ""}`}} required/>
                <p className="input__description" style={{color:`${server_error ? "red" : ""}`}}>
                  {server_error ? server_error : "The title must contain a maximum of 32 characters"}
                </p>
              </div>
              <div className="input">
                <label className="input__label">Project Type</label>
                <select className="input__field" name="project_type" defaultValue="" required>
                  <option value="" disabled>
                    Select Project Type
                  </option>
                  <option value="HCJ">HTML + CSS + JS</option>
                  <option disabled>More Coming Soon</option>
                </select>
              </div>
              <div className="input">
                <label className="input__label">Description</label>
                <textarea name="project_description" className="input__field input__field--textarea"></textarea>
                <p className="input__description">
                  Give your project a good description so everyone know what's
                  it for
                </p>
              </div>
            </div>
            <div className="modal__footer">
              <button type="submit" className="button button--primary">Create project</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Projects;
