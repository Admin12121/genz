import React, { useState, useEffect } from "react";
import "./Editor.scss";
import "./create.scss";
import { useNavigate } from 'react-router-dom';

import { getToken} from "../../Fetch_Api//Service/LocalStorageServices";
import { useGetLoggedUserQuery,useProjectsMutation } from "../../Fetch_Api/Service/User_Auth_Api";


const Projects = () => {
  const [project, setproject] = useState(false);
  const [userId, setUserId] = useState('');
  const [projects, { isLoading }] = useProjectsMutation();
  const { access_token } = getToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (userSuccess && userData) {
      try {
        setUserId(userData.id);
      } catch (error) {
        console.error("Error processing user data:", error);
      }
    }
  }, []);

  const {
    data: userData,
    isSuccess: userSuccess,
    isError: userError,
    refetch: refetchUser, // Destructure the refetch function from the query result
  } = useGetLoggedUserQuery(access_token);

  useEffect(() => {
    // Load initial project data
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
      iframe.contentWindow.eval(project.js_code);
    }
  };

  const HandleProjectSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = { 
      user: userId,
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
      const res = await projects(actualData);
      if (res.data) {
        setproject((prev) => !prev);
        refetchUser();
        document.getElementById('project_formrt').reset();
      }
    } catch (error) {
      console.log('errr');
    }
  };
  useEffect(()=>{
    refetchUser();
  },[])
  return (
    <>
      <div className={`projects-section project-view`}>
        {userData ? userData.projects.map(({id,project_title,project_type},index)=>(
        <div onClick={() => navigate(`/profile/project/WebIde/${id}`)} className="Course_wrapper pro-course-wrapper" key={index}>
        {/* <h2>{course.course}</h2> */}
        <div className="Course_card proj-course-card">
          <div className="course_image pro-course-img">
            <iframe id={`iframe_${id}`} frameborder="0"></iframe>
          </div>
          <div className="text_area">
            <h1>{project_title}</h1>
          </div>
        </div>
      </div>
        )) : ''}
        <label
          className="custum-file-upload"
          onClick={() => {
            setproject((prev) => !prev);
          }}
          for="file"
        >
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
              <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                id="SVGRepo_tracerCarrier"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </g>
            </svg>
          </div>
          <div className="texter">
            <span>Click to Create New Project</span>
          </div>
        </label>
        <div
          className="project-container"
          style={{ display: `${project ? "flex" : "none"}` }}
        >
          <form id="project_formrt" className="modal" onSubmit={HandleProjectSubmit}>
            <div className="modal__header">
              <span className="modal__title">New project</span>
              <button
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
              </button>
            </div>
            <div className="modal__body">
              <div className="input">
                <label className="input__label">Project title</label>
                <input name="project_title" className="input__field" type="text" />
                <p className="input__description">
                  The title must contain a maximum of 32 characters
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
