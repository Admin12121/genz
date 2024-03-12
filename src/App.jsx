import React,{ useState,useEffect } from "react";
import "./App.scss";
import Navebar from "./Navbar/Navebar";
import { BrowserRouter as Router, Routes, Navigate, Route, useLocation } from "react-router-dom";


import Home from "./Home/Home";
import Footer from './Footer/Footer'
import Courses from "./Course/Courses";
import Contact from "./Contact/Contact";
import About from "./About/About";
import Login_index from "./Login/Login_index";
import { useSelector } from "react-redux";
import { setUserToken } from "./Fetch_Api/Feature/authSlice";
import { useDispatch } from "react-redux";
import Profile from './Profile/Profile';
import ProjectsSection from "./Profile/ProjectionSection/ProjectSection";
import Projects from './Profile/Projects/Projects'
import Settings from './Profile/Settings/Settings'
import {
  getToken,
  // darkMode Impoted
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
import Development from "./Development/Development";
import Admission from "./Admission/Admission";
import PAymentSuccess from "./Profile/PaymentSuccess/PAymentSuccess";
import Registration from "./Profile/Registration/Registration";
import Notification from "./Notification/Notification";
import Term from "./Terms/Term";
import Refund from "./Terms/Refund";
import WebIde from "./Profile/Projects/WebIde";
const App = () => {
  // console.log(process.env.REACT_APP_COURSES_API)
  const apiKey = "http://127.0.0.1:8000/api/product/courses/"

  return (
    <>
    <Router>
      <AppContent api={apiKey} />
    </Router>
    </>
  );
};

const AppContent = ({api}) => {
  const dispatch = useDispatch();
  
  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);

  // const { access_token } = useSelector(state => state.auth)
  const location = useLocation();
  const development =  ["/development"].includes(location.pathname);
  const isLoginRoute = ["/login", "/profile", "/login/sendpasswordresetemail"].includes(location.pathname);
  const hideNavbarAndFooter = location.pathname.startsWith("/profile");
  const hideCourse = location.pathname.startsWith("/profile/courseses/incourse");

  const [Data, setData] = useState([])

  useEffect(()=>{
    fetch(api)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(err => console.log(err))
  }, [api])


  return (
    <>
      {!isLoginRoute && !development && !hideNavbarAndFooter && <Navebar />}
      {/* <Navebar animate={!isLoginRoute}/> */}
      <Routes>
        <Route path="/" element={!access_token ? <Home/> : <Navigate to="/profile" />} />
        <Route path="course" element={access_token ? <Navigate to="/" /> : <Courses  api={api}/>} />
        <Route path="contact" element={ access_token ? <Navigate to="/" /> : <Contact/>} />
        <Route path="about" element={ access_token ? <Navigate to="/" /> : <About/>} />
        <Route path="term&condition" element={ access_token ? <Navigate to="/" /> : <Term/>} />
        <Route path="policy" element={ access_token ? <Navigate to="/" /> : <Refund/>} />
        <Route path="admission" element={ access_token ? <Navigate to="/" /> : <Admission api={api}/>} />
        <Route path="development" element={ access_token ? <Navigate to="/" /> : <Development/>} />
        <Route path="login" element={!access_token ? <Login_index/> : <Navigate to="/profile" />} /> 
        <Route path="/login/sendpasswordresetemail" element={<ResetPass/> } />  
        <Route path="api/user/reset/:id/:token" element={<PassChange/>} />
        <Route path="profile" element={access_token ? <Profile /> : <Navigate to="/login" />} >
          <Route path="paymentsuccess" element={<PAymentSuccess api={api}/>}/>
          < Route index element={<Dash_Profile api={api}/>} />
          <Route path="registration" element={<Registration api={api}/>}/>
          <Route  path=":courseId" element={<Main_course api={api}/>} >
          <Route path=":id" element={<Video api={api}/>} />
          </Route>
           <Route path="courseses" element={!hideCourse && <ProjectsSection api={api}/>} >
              <Route path="incourse/:courseId" element={<In_course api={api}/>} >
              <Route index element={<About_Course api={api}/>} />
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
      {!isLoginRoute && !development && !hideNavbarAndFooter && <Footer/>}
      {/* <Footer animate={!isLoginRoute}/> */}
    </>
  );
};

export default App;
