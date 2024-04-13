import React, {useState, useEffect, useRef} from 'react';
import { Link , useParams} from "react-router-dom";
import "./header.scss";

const Header = ({ handleLogout, name, profile, email, darkMode }) => {
  const [open, setOpen] = useState(false);
  const {username, project_title} = useParams();
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }
  });

  return (
    <div className="app-header">
      <div className="app-header-left">
        {/* <span className="app-icon"></span> */}
        {/* <p className="app-name">Portfolio</p> */}
        <div
          className="logo"
        >
          <Link to="/" className='meta_logo'>
            <img src="/meta.png" alt="" />
          </Link>
          {       username && project_title ?
            <span className='user_code'>
              <Link to={`/${username}`} style={{fontSize:"10px",color: "var(--main-color)", opacity:".8"}}>{username && project_title && username}</Link>
              <p>{username && project_title && project_title}</p>
            </span>
            :
          <Link to="/">
                <p>genzcoder</p>
          </Link>
            }
        </div>
      </div>
      <div className="app-header-right">
        <button className="mode-switch"  title="Switch Theme">
          <label className="dayNight">
            <input type="checkbox" onClick={darkMode} />
            <div></div>
          </label>
        </button>
        <p style={{color:"var(--main-color)"}}>|</p>
        {/* <button className="notification-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-bell"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button> */}
        <div ref={menuRef}>
        <button className="profile-btn" onClick={()=>{setOpen(!open)}}>
          <img className='profile_img' src={profile} alt="Profile" />
          <span>{name}</span>
        </button>
        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <h3>{name}<br/><span>{email}</span></h3>
          <span>
            <DropdownItem img = { <svg width="24px"  height="24px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                      <g id="Iconly/Light/Profile" stroke="var(--main-color)"  strokeWidth="2"  fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                                          <g id="Profile" transform="translate(4.814286, 2.814476)" stroke="var(--main-color)" >
                                              <path d="M7.17047619,12.531714 C3.30285714,12.531714 -4.08562073e-14,13.1164759 -4.08562073e-14,15.4583807 C-4.08562073e-14,17.8002854 3.28190476,18.4059997 7.17047619,18.4059997 C11.0380952,18.4059997 14.34,17.8202854 14.34,15.479333 C14.34,13.1383807 11.0590476,12.531714 7.17047619,12.531714 Z" id="Stroke-1" strokeWidth="2" ></path>
                                              <path d="M7.17047634,9.19142857 C9.70857158,9.19142857 11.7657144,7.13333333 11.7657144,4.5952381 C11.7657144,2.05714286 9.70857158,-5.32907052e-15 7.17047634,-5.32907052e-15 C4.6323811,-5.32907052e-15 2.574259,2.05714286 2.574259,4.5952381 C2.56571443,7.1247619 4.60952396,9.18285714 7.13809539,9.19142857 L7.17047634,9.19142857 Z" id="Stroke-3" strokeWidth="2" ></path>
                                          </g>
                                      </g>
                                  </svg>} to={""} text = {"Profile"}/>
            {/* <DropdownItem img = {<svg width="24px"  height="24px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                      <g id="Iconly/Light/Message" stroke="var(--main-color)"  strokeWidth="2"  fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                                          <g id="Message" transform="translate(2.000000, 3.000000)" stroke="var(--main-color)"  strokeWidth="2" >
                                              <path d="M15.9026143,5.8511436 L11.4593272,9.46418164 C10.6198313,10.1301843 9.4387043,10.1301843 8.59920842,9.46418164 L4.11842516,5.8511436" id="Stroke-1"></path>
                                              <path d="M14.9088637,17.9999789 C17.9502135,18.0083748 20,15.5095497 20,12.4383622 L20,5.57001263 C20,2.49882508 17.9502135,5.32907052e-15 14.9088637,5.32907052e-15 L5.09113634,5.32907052e-15 C2.04978648,5.32907052e-15 1.77635684e-15,2.49882508 1.77635684e-15,5.57001263 L1.77635684e-15,12.4383622 C1.77635684e-15,15.5095497 2.04978648,18.0083748 5.09113634,17.9999789 L14.9088637,17.9999789 Z" id="Stroke-3"></path>
                                          </g>
                                      </g>
                                  </svg>} to={"https://mail.google.com/"} text = {"Inbox"}/> */}
            <DropdownItem img = {<svg width="24px"  height="24px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                      <g id="Iconly/Light/Setting" stroke="var(--main-color)"  strokeWidth="2"  fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                                          <g id="Setting" transform="translate(2.500000, 1.500000)" stroke="var(--main-color)"  strokeWidth="2" >
                                              <path d="M18.3066362,6.12356982 L17.6842106,5.04347829 C17.1576365,4.12955711 15.9906873,3.8142761 15.0755149,4.33867279 L15.0755149,4.33867279 C14.6398815,4.59529992 14.1200613,4.66810845 13.6306859,4.54104256 C13.1413105,4.41397667 12.7225749,4.09747295 12.4668193,3.66132725 C12.3022855,3.38410472 12.2138742,3.06835005 12.2105264,2.74599544 L12.2105264,2.74599544 C12.2253694,2.22917739 12.030389,1.72835784 11.6700024,1.3576252 C11.3096158,0.986892553 10.814514,0.777818938 10.2974829,0.778031878 L9.04347831,0.778031878 C8.53694532,0.778031878 8.05129106,0.97987004 7.69397811,1.33890085 C7.33666515,1.69793166 7.13715288,2.18454839 7.13958814,2.69107553 L7.13958814,2.69107553 C7.12457503,3.73688099 6.27245786,4.57676682 5.22654465,4.57665906 C4.90419003,4.57331126 4.58843537,4.48489995 4.31121284,4.32036615 L4.31121284,4.32036615 C3.39604054,3.79596946 2.22909131,4.11125048 1.70251717,5.02517165 L1.03432495,6.12356982 C0.508388616,7.03634945 0.819378585,8.20256183 1.72997713,8.73226549 L1.72997713,8.73226549 C2.32188101,9.07399614 2.68650982,9.70554694 2.68650982,10.3890161 C2.68650982,11.0724852 2.32188101,11.704036 1.72997713,12.0457667 L1.72997713,12.0457667 C0.820534984,12.5718952 0.509205679,13.7352837 1.03432495,14.645309 L1.03432495,14.645309 L1.6659039,15.7345539 C1.9126252,16.1797378 2.3265816,16.5082503 2.81617164,16.6473969 C3.30576167,16.7865435 3.83061824,16.7248517 4.27459956,16.4759726 L4.27459956,16.4759726 C4.71105863,16.2212969 5.23116727,16.1515203 5.71931837,16.2821523 C6.20746948,16.4127843 6.62321383,16.7330005 6.87414191,17.1716248 C7.03867571,17.4488473 7.12708702,17.764602 7.13043482,18.0869566 L7.13043482,18.0869566 C7.13043482,19.1435014 7.98693356,20.0000001 9.04347831,20.0000001 L10.2974829,20.0000001 C11.3504633,20.0000001 12.2054882,19.1490783 12.2105264,18.0961099 L12.2105264,18.0961099 C12.2080776,17.5879925 12.4088433,17.0999783 12.7681408,16.7406809 C13.1274382,16.3813834 13.6154524,16.1806176 14.1235699,16.1830664 C14.4451523,16.1916732 14.7596081,16.2797208 15.0389017,16.4393593 L15.0389017,16.4393593 C15.9516813,16.9652957 17.1178937,16.6543057 17.6475973,15.7437072 L17.6475973,15.7437072 L18.3066362,14.645309 C18.5617324,14.2074528 18.6317479,13.6859659 18.5011783,13.1963297 C18.3706086,12.7066935 18.0502282,12.2893121 17.6109841,12.0366133 L17.6109841,12.0366133 C17.17174,11.7839145 16.8513595,11.3665332 16.7207899,10.876897 C16.5902202,10.3872608 16.6602358,9.86577384 16.9153319,9.42791767 C17.0812195,9.13829096 17.3213574,8.89815312 17.6109841,8.73226549 L17.6109841,8.73226549 C18.5161253,8.20284891 18.8263873,7.04344892 18.3066362,6.13272314 L18.3066362,6.13272314 L18.3066362,6.12356982 Z" id="Path_33946"></path>
                                              <circle id="Ellipse_737" cx="9.67505726" cy="10.3890161" r="2.63615562"></circle>
                                          </g>
                                      </g>
                                  </svg>} to={"settings"} text = {"Settings"}/>
            <DropdownItem img = {<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M10 3h4a8 8 0 1 1 0 16v3.5c-5-2-12-5-12-11.5a8 8 0 0 1 8-8zm2 14h2a6 6 0 1 0 0-12h-4a6 6 0 0 0-6 6c0 3.61 2.462 5.966 8 8.48V17z"></path></svg>} to={"feedback"} text = {"Send feedback"}/>
           <span></span>
            <DropdownItem logout={handleLogout} img = {<svg width="24px"  height="24px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                          <g id="Iconly/Light/Logout" stroke="var(--main-color)"  strokeWidth="2"  fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                                                              <g id="Logout" transform="translate(2.000000, 2.000000)" stroke="var(--main-color)"  strokeWidth="2" >
                                                                  <path d="M13.016,5.3895 L13.016,4.4565 C13.016,2.4215 11.366,0.7715 9.331,0.7715 L4.456,0.7715 C2.422,0.7715 0.772,2.4215 0.772,4.4565 L0.772,15.5865 C0.772,17.6215 2.422,19.2715 4.456,19.2715 L9.341,19.2715 C11.37,19.2715 13.016,17.6265 13.016,15.5975 L13.016,14.6545" id="Stroke-1"></path>
                                                                  <line x1="19.8095" y1="10.0214" x2="7.7685" y2="10.0214" id="Stroke-3"></line>
                                                                  <polyline id="Stroke-5" points="16.8812 7.1063 19.8092 10.0213 16.8812 12.9373"></polyline>
                                                              </g>
                                                          </g>
                                                      </svg>} text = {"Logout"}/>
          </span>
        </div>
        </div>
      </div>
      {/* <button className="messages-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-message-circle"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button> */}
    </div>
  );
};
function DropdownItem(props){
  return(
    <Link to={props.to} onClick={props.logout} className = 'dropdownItem'>
      <span>{props.img}</span>
      <p> {props.text} </p>
    </Link>
  );
}

export default Header;
