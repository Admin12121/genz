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
        <div className="profile_Image">
          <div className="image_wrapper">
          {userData && <img src={`https://project.vickytajpuriya.com/${userData.userinfo.profile}`} alt="" />}
          </div>
          <div className="user_info_wrapper">
            <span className="sett">
              {userData && <h1>{userData.name}</h1>}
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
        </div>
        
      </div>
    </>
  );
};

export default Dash_Profile;
