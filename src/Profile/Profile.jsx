import React, { useState, useEffect, useRef } from "react";
import Header from "./Header/Header";
import "./Profile.css";
import Sidebar from "./App_Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetLoggedUserQuery, useRefreshAccessTokenMutation } from '../Fetch_Api/Service/User_Auth_Api';
import { setUserToken, unSetUserToken } from '../Fetch_Api/Feature/authSlice';
import { getToken,storeToken, removeToken, storeMode, getMode } from '../Fetch_Api/Service/LocalStorageServices';
import { useDispatch } from "react-redux";
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
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);

 useEffect(() => {
    document.body.style.overflow = "hidden";
    
    const handleRightClick = (e) => {
      e.preventDefault();

      if (card.current.contains(e.target)) {
        setContextMenuVisible(true);
        
        const contextMenuWidth = 257; // Adjust this value based on your design
        const contextMenuHeight = 250; // Adjust this value based on your design
        
        const cardRect = card.current.getBoundingClientRect();
        const leftPosition = Math.min(e.clientX, cardRect.right - contextMenuWidth);
        const topPosition = Math.min(e.clientY, cardRect.bottom - contextMenuHeight);
        
        contextMenu.current.style.left = `${leftPosition}px`;
        contextMenu.current.style.top = `${topPosition}px`;
      } else {
        setContextMenuVisible(false);
      }
    };
    
    const handleCloseContextMenu = (e) => {
      if (!contextMenu.current.contains(e.target)) {
        setContextMenuVisible(false);
      }
    };
    
    window.addEventListener("contextmenu", handleRightClick);
    window.addEventListener("click", handleCloseContextMenu);
    
    return () => {
      window.removeEventListener("contextmenu", handleRightClick);
      window.removeEventListener("click", handleCloseContextMenu);
    };
  }, []);
  
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

  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
    if(loading){
      setLoading(false)
    }
  }, [access_token, dispatch]);

  const handleLogout = () => {
    // Clear user data from Redux store
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate('/');
  };

  const [darkMode, setDarkModee] = useState(getMode());
  const handletoggle =() =>{
    setDarkModee((prev) => !prev)
    storeMode(darkMode)
  }
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    storeMode(darkMode);
  }, [darkMode]);
  return (
    <>
      <section className={`app-container`} ref={card} >
        <Header
         darkMode={handletoggle}
          name={data && data.name}
          profile={data && `https://project.vickytajpuriya.com${data.userinfo.profile}`}
          email={data && data.email}
          handleLogout={handleLogout}
        />
        <div className="app-content">
          <Sidebar />
          <Outlet />
        <div className={`context_menu_wrap ${contextMenuVisible ? '' : 'hidden'}`} ref={contextMenu}>
          <ContextMenu />
        </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
