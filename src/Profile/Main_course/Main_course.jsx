import React, { useState, useEffect } from 'react'
import { useParams,Link, Outlet } from 'react-router-dom';
import './Cour.scss'
import { getToken} from "../../Fetch_Api/Service/LocalStorageServices";
import { useCourseQuery } from "../../Fetch_Api/Service/User_Auth_Api";
const Main_course = () => {
  
  const { access_token } = getToken();
  const {name} = useParams();
  const {
     data: Data,
     isSuccess: userSuccess,
     isError: userError,
  } = useCourseQuery({access_token,name});

     const [display,setDisplay] = useState([]);
     const [isArrowVisible, setArrowVisible] = useState([]);
     const [disp, setDisp] = useState(true)


       const [windowWidth, setWindowWidth] = useState(window.innerWidth);
       const [handleWidth,setWidth] = useState(window.innerWidth)
     useEffect(() => {
       const handleResize = () => {
           setWindowWidth(window.innerWidth);
           setWidth(window.innerWidth);
         };
         window.addEventListener('resize', handleResize);
    
         return () => {
         window.removeEventListener('resize', handleResize);
         };
       }, []);

      if (!Array.isArray(Data)) {
    //    // Display a loading state or handle the case where data is not an array
          return <h1>Loading...</h1>;
     }
      
       const handleArrow = (index) => {
         setArrowVisible((prev) =>
           prev.map((value, i) => (i === index ? !value : value))
      );
     };

   const sidebarStyle = {
     width: disp && windowWidth < 1230 ? '70%' : '0%',
     height: disp && windowWidth < 1230 ? '97%' : '20%',
     top: disp && windowWidth < 1230 ? '2%' : '35%',
     padding: disp && windowWidth < 1230 ? '' : '5px',
     left: disp && windowWidth < 1230 ? '10px' : '0px',
   };

  return (
    <>
       <div className="project_course_section mtrt">
       <div  style={ handleWidth < 1230 ? sidebarStyle : {width:"30%"}} className="Course_title_wrapper">
          <div  className="txt_syllabus">
         <h1>{Data && Data[0].name}</h1>
        {Data && Data[0].syllabi.map(({ nameof_syllabus1,coursedata_set}, index) => (
        <div key={index} className="Cont_Topic">
          <div className="Topic_Title"  onClick={() => handleArrow(index)}>
            <h1>{nameof_syllabus1}</h1>
            <svg width="24px"  height="24px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <title>Iconly/Light/Arrow - Down 2</title>
                <g id="Iconly/Light/Arrow---Down-2" stroke="var(--main-color)"  strokeWidth="2"  fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                    <g id="Arrow---Down-2" transform="translate(5.000000, 8.500000)" stroke="var(--main-color)"  strokeWidth="2" >
                        <polyline id="Stroke-1" points="14 0 7 7 0 0"></polyline>
                    </g>
                </g>
            </svg>
          </div>
          {coursedata_set && coursedata_set.map(({id, video_title }, dataIndex) => (
            <div key={dataIndex} className="Title_content">
            <span >
              <Link to={`${video_title}`}><h1 >{video_title.slice(0,45)}...</h1></Link>
              {/* <p className="time">{duration_minutes}:{duration_seconds}</p> */}
            </span>
          </div>
))}
        </div>
        
      ))}
          </div>
          <span className='arr' onClick={()=>{setDisp(prev => !prev)}} style={{transform:`rotate(${disp ? "180deg" : "0deg"})`,position:`${disp ? "" : "absolute" }`,left:`${disp ?  "" : "1px"}`}}>{">"}</span>
        </div> 
        <div className="Cont_Course_info">
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default Main_course
