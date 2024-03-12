import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Demo from '../../ProjectionSection/Course/Trial_Video/Demo';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { BsClipboard2, BsClipboard2Check } from "react-icons/bs";
import {getMode} from '../../../Fetch_Api/Service/LocalStorageServices'
import './video.scss'
import Code from '../../../Components/Code'

const Video = () => {
  const api = "http://127.0.0.1:8000/api/product/coursedata/"
  const { courseId, id } = useParams();
  const [Data, setData] = useState([]);
  const [copy,setCopy] = useState(false);
  const [mode, setDarkModee] = useState(getMode());
  
  useEffect(() => {
    setDarkModee(getMode());
  }, []);

  useEffect(() => {
    fetch(api + id)
      .then(response => response.json())
      .then(data => {setData(data)})
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
    }, [api, id]);
    if (Array.isArray(Data)) {
      // Display a loading state or handle the case where data is not an array
      return <> 
      <div style={{display: "flex", alignItems: "center", justifyContent: 'center', height:"100%" ,width:"100%"}}>
        <Code/>
      </div></>;
    }
    // console.log(Data.code1)
    const codeString = Data.code1 ? Data.code1 : '';
    const handlecopy =()=>{
      navigator.clipboard.writeText(codeString);
      setCopy(true);
      setTimeout(()=>{
        setCopy(false);
      }, 3000);
    }
    const codeString1 = Data.code1 ? Data.code2 : '';
    const handlecopy1 =()=>{
      navigator.clipboard.writeText(codeString1);
      setCopy(true);
      setTimeout(()=>{
        setCopy(false);
      }, 3000);
    }
    const codeString2 = Data.code1 ? Data.code2 : '';
    const handlecopy2 =()=>{
      navigator.clipboard.writeText(codeString2);
      setCopy(true);
      setTimeout(()=>{
        setCopy(false);
      }, 3000);
    }
  return (
    <>
    <div className="main_courseData_Wrapper">
      <div className="courseData_player">
        <Demo video_1={Data.videourl}  cor={Data.video_title}/>
      </div>
      <div className="Course_title_Wrapper">
        <h1>{Data.content}</h1>
      {Data.note1 && <p>{Data.note1}</p>}
      {!codeString=='' &&  <div className="code-editor">	
      <div className="coder-span-example">
        <p>Example code</p>
        {
          copy ? (
            <span><BsClipboard2Check/><p>copied!</p></span>
          ):
          (
            <span onClick={handlecopy}><BsClipboard2/><p>Copy code</p></span>
          )
        }
      </div>
      <SyntaxHighlighter language={Data.CodeType} style={mode ? atomOneDark : docco} wrapLongLines={true} showLineNumbers={true} customStyle={{padding:"25px"}}>
      {codeString}
    </SyntaxHighlighter>
    </div>}
    {Data.note2 && <p>{Data.note2}</p>}
    {!codeString1=='' &&  <div className="code-editor">	
      <div className="coder-span-example">
        <p>Example code</p>
        {
          copy ? (
            <span><BsClipboard2Check/><p>copied!</p></span>
            ):
            (
              <span onClick={handlecopy1}><BsClipboard2/><p>Copy code</p></span>
              )
            }
      </div>
      <SyntaxHighlighter language={Data.CodeType} style={mode ? atomOneDark : docco} wrapLongLines={true} showLineNumbers={true} customStyle={{padding:"25px"}}>
      {codeString1}
    </SyntaxHighlighter>
    </div>}
            {Data.note3 && <p>{Data.note3}</p>}
            {!codeString2=='' &&  <div className="code-editor">	
      <div className="coder-span-example">
        <p>Example code</p>
        {
          copy ? (
            <span><BsClipboard2Check/><p>copied!</p></span>
            ):
            (
              <span onClick={handlecopy2}><BsClipboard2/><p>Copy code</p></span>
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
