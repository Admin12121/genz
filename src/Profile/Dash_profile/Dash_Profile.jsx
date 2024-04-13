import React, { useState, useEffect } from "react";
import { getToken} from "../../Fetch_Api//Service/LocalStorageServices";
import { useGetLoggedUserQuery } from "../../Fetch_Api/Service/User_Auth_Api";
import "./dash.scss";
import { Link } from "react-router-dom";

const Dash_Profile = () => {
  const { access_token } = getToken();
  const {
    data: userData,
    isSuccess: userSuccess,
    isError: userError,
  } = useGetLoggedUserQuery(access_token);

  return (
    <>
      <div className="projects-section wart">
      <div className="profile_Image" style={{flexDirection:"column",gap:"20px"}}>
                    {userData && <h1>{userData.name}</h1>}
            <div className="image_wrapper">
            {userData && <img src={`https://project.vickytajpuriya.com${userData.userinfo.profile}`} alt={`${userData.username}`} />}
                <span style={{position:"absolute", color:"var(--main-color)", top:"5px", right: "5px"}}>            
                    <Link to="settings">
                    <svg
                          className="link-icon feather feather-settings"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          style={{color:"var(--main-color)"}}
                        >
                          <defs />
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                      </svg>
                    </Link>
            </span>
            </div>
            <div className="user_info_wrapper">
              <span className="sett">
                  {userData &&  <a href={`mailto:${userData.email}`} style={{color:"var(--main-color)"}}>
                  <svg width="24px"  height="24px"  viewBox="0 0 24 24"  fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.9028 8.85114L13.4596 12.4642C12.6201 13.1302 11.4389 13.1302 10.5994 12.4642L6.11865 8.85114" stroke="var(--main-color)"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 11.5V8.57001C22 5.49883 19.9502 3 16.9089 3H7.09114C4.04979 3 2 5.49883 2 8.57001V15.4384C2 18.5095 4.04979 21.0084 7.09114 21H16.9089C19.9502 21.0084 22 18.5095 22 15.4384V15" stroke="var(--main-color)"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                    {userData.email}</a>}
                  {userData && userData.userinfo.portfolio && <a href={userData && userData.userinfo.portfolio} target="_blank" style={{color:"var(--main-color)"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="group-hover:text-sky-500 transition-colors"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"></path></svg>
                    {userData && userData.userinfo.portfolio}</a>}
              </span>
            </div>
            <div className="user_per_info">
              <p>{userData && userData.userinfo.bio}</p>
            </div>
        </div>
        {/* <div className="profile_Image">
          <div className="image_wrapper">
          {userData && <img src={`https://project.vickytajpuriya.com/${userData.userinfo.profile}`} alt="" />}
          </div>
          <div className="user_info_wrapper">
            <span className="sett">
           
              <span>            
                <Link to="settings">
                <svg
          className="link-icon feather feather-settings"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <defs />
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                  </svg>
                </Link>
        </span>
            </span>
            {userData && <>{userData.email}</>}
          </div>
        </div> */}
        
      </div>
    </>
  );
};

export default Dash_Profile;
