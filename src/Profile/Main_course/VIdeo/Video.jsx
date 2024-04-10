import React,{useState, useEffect , lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {getMode} from '../../../Fetch_Api/Service/LocalStorageServices'
// import VideoJS from './Player';
import './video.scss'
import './player.css'
import Loader from '../../../Components/Loader'
import { getToken} from "../../../Fetch_Api/Service/LocalStorageServices";
import { useCourseQuery } from "../../../Fetch_Api/Service/User_Auth_Api";


const Video = () => {
  const { video_title } = useParams();
  const LazyLoadedComponent = lazy(() => import("./Player"));
  const [copy,setCopy] = useState(false);
  const [mode, setDarkModee] = useState(getMode());
  const { access_token } = getToken();
  useEffect(() => {
    setDarkModee(getMode());
  }, []);
  const {
    data: Data,
    isSuccess: userSuccess,
    isError: userError,
 } = useCourseQuery({access_token,video_title});

     if (!Array.isArray(Data)) {
       // Display a loading state or handle the case where data is not an array
       return <> 
       <div style={{display: "flex", alignItems: "center", justifyContent: 'center', height:"100%" ,width:"100%"}}>
         <Loader/>
       </div></>;
     }

    const codeString = Data[0].code1 ? Data[0].code1 : '';
     const handlecopy =()=>{
       navigator.clipboard.writeText(codeString);
       setCopy(true);
       setTimeout(()=>{
         setCopy(false);
       }, 3000);
     }
    //  const codeString1 = '';
      const codeString1 =  Data[0].code1 ?  Data[0].code2 : '';
     const handlecopy1 =()=>{
       navigator.clipboard.writeText(codeString1);
       setCopy(true);
       setTimeout(()=>{
         setCopy(false);
       }, 3000);
     }
    //  const codeString2 =  '';
      const codeString2 =  Data[0].code1 ?  Data[0].code3 : '';
     const handlecopy2 =()=>{
       navigator.clipboard.writeText(codeString2);
       setCopy(true);
       setTimeout(()=>{
         setCopy(false);
       }, 3000);
     }
     const videoJsOptions = {
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      playbackRates: [0.5,1,1.5,2],
      poster:`${Data[0].videourl}`,
      sources: [{
        src: `https://project.vickytajpuriya.com/${Data[0].video}`,
        type: 'video/mp4'
      }]
    };
  return (
    <>
    <div className="main_courseData_Wrapper">
      <div className="courseData_player">
      {Data[0].video && <Suspense fallback={<Loader/>}>
          <LazyLoadedComponent  options={videoJsOptions} />
        </Suspense>}
       {/* {Data[0].video &&  <VideoJS options={videoJsOptions}  />} */}
      </div>
      <div className="Course_title_Wrapper">
        <h1>{Data.content}</h1>
      {Data[0].note1 && <p>{Data[0].note1}</p>}
      {!codeString=='' &&  <div className="code-editor">	
      <div className="coder-span-example">
        <p>Example code</p>
        {
          copy ? (
            <span><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path fill="#fff" d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm.59 4.59l4.83 4.83c.37.37.58.88.58 1.41V21c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h6.17c.53 0 1.04.21 1.42.59zM15 12h4.5L14 6.5V11c0 .55.45 1 1 1z"/></svg><p>copied!</p></span>
          ):
          (
            <span onClick={handlecopy}><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path  fill="#fff" d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm4 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"/></svg><p>Copy code</p></span>
          )
        }
      </div>
      <SyntaxHighlighter language={Data[0].CodeType} style={mode ? atomOneDark : docco} wrapLongLines={true} showLineNumbers={true} customStyle={{padding:"25px"}}>
      {codeString}
    </SyntaxHighlighter>
    </div>}
    {Data[0].note2 && <p>{Data[0].note2}</p>}
    {!codeString1=='' &&  <div className="code-editor">	
      <div className="coder-span-example">
        <p>Example code</p>
        {
          copy ? (
            <span><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path fill="#fff" d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm.59 4.59l4.83 4.83c.37.37.58.88.58 1.41V21c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h6.17c.53 0 1.04.21 1.42.59zM15 12h4.5L14 6.5V11c0 .55.45 1 1 1z"/></svg><p>copied!</p></span>
            ):
            (
              <span onClick={handlecopy1}><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path  fill="#fff" d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm4 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"/></svg><p>Copy code</p></span>
              )
            }
      </div>
      <SyntaxHighlighter language={Data.CodeType} style={mode ? atomOneDark : docco} wrapLongLines={true} showLineNumbers={true} customStyle={{padding:"25px"}}>
      {codeString1}
    </SyntaxHighlighter>
    </div>}
            {Data[0].note3 && <p>{Data[0].note3}</p>}
            {!codeString2=='' &&  <div className="code-editor">	
      <div className="coder-span-example">
        <p>Example code</p>
        {
          copy ? (
            <span><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path fill="#fff" d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm.59 4.59l4.83 4.83c.37.37.58.88.58 1.41V21c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h6.17c.53 0 1.04.21 1.42.59zM15 12h4.5L14 6.5V11c0 .55.45 1 1 1z"/></svg><p>copied!</p></span>
            ):
            (
              <span onClick={handlecopy2}><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path  fill="#fff" d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm4 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"/></svg><p>Copy code</p></span>
              )
            }
      </div>
      <SyntaxHighlighter language={Data.CodeType} style={mode ? atomOneDark : docco} wrapLongLines={true} showLineNumbers={true} customStyle={{padding:"25px"}}>
      {codeString2}
    </SyntaxHighlighter>
    </div>}
      </div>
    </div>
    </>
  )
}

export default Video
