import React, { useState, useEffect, useRef } from "react";
import Header from "./Header/Header";
import "./Profile.css";
import Sidebar from "./App_Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetLoggedUserQuery, useRefreshAccessTokenMutation } from '../Fetch_Api/Service/User_Auth_Api';
import { setUserToken, unSetUserToken } from '../Fetch_Api/Feature/authSlice';
import { getToken,storeToken, removeToken, storeMode, getMode } from '../Fetch_Api/Service/LocalStorageServices';
import { useDispatch, useSelector } from "react-redux";
import ContextMenu from "./ContextMenu/ContextMenu";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const { access_token,refresh_token } = getToken();
  const [server_error, setServerError] = useState({});
  const [update, {isLoading}] = useRefreshAccessTokenMutation();

  const card = useRef()
  const contextMenu = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleRigthClick = (e) => {
      e.preventDefault()
      if(card.current.contains(e.target)) {
        contextMenu.current.classList.remove("hidden");
        contextMenu.current.style.left = `${e.clientX}px`;
        contextMenu.current.style.top = `${e.clientY}px`;

      } else {
        contextMenu.current.classList.add("hidden")
      }
    }
    window.addEventListener("contextmenu", handleRigthClick)
    
    const handleCloseContextMenu = (e) => {
      if(!contextMenu.current.contains(e.target)) {
        contextMenu.current.classList.add("hidden")
      }
    }
    window.addEventListener("click", handleCloseContextMenu)

    return () => {
      window.removeEventListener("contextmenu", handleRigthClick)
      window.removeEventListener("click", handleCloseContextMenu)
    }
  })


  // const refreshToken = useSelector((state) => state.auth.refresh_token);
  const updateToken = async () => {
    const actualData = {
      refresh: getToken().refresh_token,
    };

    const res = await update(actualData);
    if (res.error) {
      setServerError("error when updating token");
    }
    if (res.data) {
      storeToken(res.data);
      let { access_token,refresh_token } = getToken();
      dispatch(setUserToken({ access_token, refresh_token }));
    }
  };

  useEffect(()=>{
     if(loading){
       updateToken();
     }

    let interval = setInterval(()=>{
       if(refresh_token){
         updateToken();
       }
     }, 18000000)
    return () => clearInterval(interval)

  },[refresh_token, loading] )


  // Use local storage to store user data
  const saveUserDataToLocalStorage = (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
  };

  const clearUserDataFromLocalStorage = () => {
    localStorage.removeItem('userData');
  };

  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
    if(loading){
      setLoading(false)
    }
  }, [access_token, dispatch]);

  const { data, isSuccess } = useGetLoggedUserQuery(access_token);

  const [userData, setUserData] = useState({
    id: '',
    email: '',
    name: '',
    phone: '',
  });

  const [userInfo, setUserInfo] = useState({
    profile: '',
    facebook: '',
    instagram: '',
    linkind: '',
    bio: '',
    address: '',
  });

  const handleLogout = () => {
    // Clear user data from Redux store
    dispatch(unSetUserToken({ access_token: null }));

    // Clear user data from local storage
    clearUserDataFromLocalStorage();

    // Remove token from local storage

    removeToken();

    // Navigate to the home page
    navigate('/');
  };
  useEffect(() => {

    if (data && isSuccess) {
      // Update state with user data
      if(loading){
        setLoading(false)
      }
      setUserData({
        id: data.id,
        email: data.email,
        name: data.name,
        phone: data.phone,
      });
      const backendBaseUrl = 'https://project.vickytajpuriya.com';
      const profileImageUrl = `${backendBaseUrl}${data.userinfo.profile}`;  

      setUserInfo({
        profile: profileImageUrl,
        facebook: data.userinfo.facebook,
        instagram: data.userinfo.instagram,
        linkind: data.userinfo.linkind,
        bio: data.userinfo.bio,
        address: data.userinfo.address,
      });
    }
  }, [data, isSuccess]);

  const [darkMode, setDarkModee] = useState(getMode());
  const handletoggle =() =>{
    setDarkModee((prev) => !prev)
    storeMode(darkMode)
  }
  
  return (
    <>
      <section className={`app-container ${darkMode ? 'dark' : ''}`} ref={card} >
        <Header
         darkMode={handletoggle}
          name={userData.name}
          profile={userInfo.profile}
          email={userData.email}
          handleLogout={handleLogout}
        />
        <div className="app-content">
          <Sidebar />
          <Outlet />
          <div className={`Cont_menu_wrap hidden`} ref={contextMenu}>
          <ContextMenu/>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
