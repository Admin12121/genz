import React,{ useState,useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Navigate, Route, useLocation } from "react-router-dom";

import Login_index from "./Login/Login_index";
import Sign from "./Login/Sign";
import { setUserToken } from "./Fetch_Api/Feature/authSlice";
import { useDispatch } from "react-redux";
import Profile from './Profile/Profile';
import ProjectsSection from "./Profile/ProjectionSection/ProjectSection";
import Projects from './Profile/Projects/Projects'
import Settings from './Profile/Settings/Settings'
import {
  getToken,
} from "./Fetch_Api/Service/LocalStorageServices";
import Dash_Profile from "./Profile/Dash_profile/Dash_Profile";
import In_course from "./Profile/ProjectionSection/Course/AQR/In_course";
import About_Course from "./Profile/ProjectionSection/Course/AQR/About_Course";
import QA from "./Profile/ProjectionSection/Course/AQR/QA";
import Review from "./Profile/ProjectionSection/Course/AQR/Review";
import Main_course from "./Profile/Main_course/Main_course";
import Video from "./Profile/Main_course/VIdeo/Video";
import ResetPass from "./Login/ResetPass/ResetPass";
import PassChange from "./Login/changePass/PassChange";
import PAymentSuccess from "./Profile/PaymentSuccess/PAymentSuccess";
import Registration from "./Profile/Registration/Registration";
import WebIde from "./Profile/Projects/WebIde";
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
        <Route path="login" element={!access_token ? <Login_index/> : <Navigate to="/profile" />} /> 
        <Route path="Signup" element={!access_token ? <Sign/> : <Navigate to="/profile" />} /> 
        <Route path="/login/sendpasswordresetemail" element={<ResetPass/> } />  
        <Route path="api/user/reset/:id/:token" element={<PassChange/>} />
        <Route path="/" element={access_token ? <Profile /> : <Navigate to="/login" />} >
          <Route path="paymentsuccess" element={<PAymentSuccess />}/>
          < Route index element={<Dash_Profile />} />
          <Route path="registration" element={<Registration />}/>
          <Route  path=":courseId" element={<Main_course />} >
          <Route path=":id" element={<Video />} />
          </Route>
           <Route path="courseses" element={!hideCourse && <ProjectsSection />} >
              <Route path="incourse/:courseId" element={<In_course />} >
              <Route index element={<About_Course />} />
              <Route path="QA" element={<QA/>} />
              <Route path="Review" element={<Review/>} />
            </Route>
          </Route>        
          <Route path="project" element={<Projects/>} />
          <Route path="project/WebIde/:id" element={<WebIde/>}/>
          <Route path="settings" element={<Settings/>} /> 
        </Route>
        <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
      </Routes>
    </>
  );
};

export default App;
