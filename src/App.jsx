
import React,{ useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Navigate, Route, useLocation } from "react-router-dom";

import { setUserToken } from "./Fetch_Api/Feature/authSlice";
import { useDispatch } from "react-redux";
import Login_index from "./Login/Login_index";
import Sign from "./Login/Sign";
import Profile from './Profile/Profile';
import ProjectsSection from "./Profile/ProjectionSection/ProjectSection";
import Projects from './Profile/Projects/Projects'
import Settings from './Profile/Settings/Settings'
import {
  getToken,
} from "./Fetch_Api/Service/LocalStorageServices";
import Dash_Profile from "./Profile/Dash_profile/Dash_Profile";
import Main_course from "./Profile/Main_course/Main_course";
import Video from "./Profile/Main_course/VIdeo/Video";
import ResetPass from "./Login/ResetPass/ResetPass";
import PassChange from "./Login/changePass/PassChange";
import WebIde from "./Profile/Projects/WebIde";
import User_Profiles from "./Profile/Dash_profile/User_Profiles";
import Code from "./Profile/Code/Code";
const App = () => {
  // console.log(process.env.REACT_APP_COURSES_API)


  return (
    <>
    <Router>
      <AppContent />
    </Router>
    </>
  );
};

const AppContent = () => {
  const dispatch = useDispatch();
  
  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);

  // const { access_token } = useSelector(state => state.auth)
  const location = useLocation();
  const hideCourse = location.pathname.startsWith("/profile/courseses/incourse");

  return (
    <>
      <Routes>
        <Route path="login" element={!access_token ? <Login_index/> : <Navigate to="/" />} /> 
        <Route path="signup" element={!access_token ? <Sign/> : <Navigate to="/" />} /> 
        <Route path="/login/sendpasswordresetemail" element={<ResetPass/> } />  
        <Route path="api/user/reset/:id/:token" element={<PassChange/>} />
        <Route path="/" element={access_token ? <Profile /> : <Navigate to="/login" />} >
          <Route index element={<Dash_Profile />} />
           <Route path="courses" element={<ProjectsSection />} />
              <Route path="courses/:name" element={<Main_course />} >
                 <Route path=":video_title" element={<Video />} />        
              </Route>
          <Route path="project" element={<Projects/>} />
          <Route path="/code/:username/:project_title" element={<WebIde/>}/>
          <Route path=":username" element={<User_Profiles />} />
          <Route path="code/" element={<Code />} />
          <Route path="settings" element={<Settings/>} /> 
        </Route>
        <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
      </Routes>
    </>
  );
};

export default App;
