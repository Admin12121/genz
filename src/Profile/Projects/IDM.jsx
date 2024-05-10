import React, { useState, useRef, useEffect } from "react";
import SplitPane from "react-split-pane";
import Editor from "@monaco-editor/react";
import {useBlocker , useParams } from "react-router-dom";
import {useProjectdataQuery, useUpdateprojectsMutation, useDeleteprojectsMutation,useGetLoggedUserQuery  } from "../../Fetch_Api/Service/User_Auth_Api";
import { useNavigate} from 'react-router-dom';
import Loader from "../../Components/Loader";
import { getMode} from '../../Fetch_Api/Service/LocalStorageServices';
import './style.scss'
import {toast } from 'sonner';
import DOMPurify from "dompurify";

const IDM = () => {
    const [updateprojects, { isLoading }] = useUpdateprojectsMutation();
    const [deleteprojects] = useDeleteprojectsMutation();
    const [loading, setLoading] = useState(true);
    const [filename, setfilename] = useState("index.html");
    const [projectsett, setprojectsett] = useState(false);
    const [mountcomp, setmountComp] = useState(false);
    const [save, setSave] = useState(false);
    const navigate = useNavigate();
    const [query, setquery] = useState('html')
    const monacoEditorhtml = useRef();
    const monacoEditorcss = useRef();
    const monacoEditorjs = useRef();
    const [gridi, setgridi] = useState(true);
    const [screen ,setScreen] = useState(false)
    const [change ,setChange] = useState(false)
    const {username, project_title} = useParams();
    const [Data, setData] = useState('');
    const id = Data.id || Data[0] && Data[0].id
    const theme = getMode()
    const [mode, setmode] = useState(theme);
    const {
      data: userData,
    } = useGetLoggedUserQuery();
    const {
      data: data,
      isSuccess: userSuccess,
      isError: userError,
      refetch :refetch
    } = useProjectdataQuery({username, project_title});
    useEffect(() => {
        if(data){
        setData(data.results[0])
        setLoading(false)
        }

        const handleResize = () => {
          const screenWidth = window.innerWidth;
           if (screenWidth <= 1000) {
             setScreen(true)
           } else {
             setScreen(false)
           }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, [data]);


       if (loading) {
         return <>
           <div style={{display: "flex", alignItems: "center", justifyContent: 'center', height:"100%" ,width:"100%"}}>
           <Loader/>
           </div>
          </>;
       }

      const files = {
        "index.html": {
          name: "index.html",
          language: "html",
          value: Data && Data.html_code,
        },
        "style.css": {
          name: "style.css",
          language: "css",
          value: Data && Data.css_code,
        },
        "script.js": {
          name: "script.js",
          language: "javascript",
          value: Data && Data.js_code,
        },
      };
      const file = files[filename];
    
      const handlecodeh = (editor, monaco) => {
        monacoEditorhtml.current = editor;

      };
      const handlecodec = (editor, monaco) => {
        monacoEditorcss.current = editor;
      };
      const handlecodej = (editor, monaco) => {
        monacoEditorjs.current = editor;
      };
      const getEditor = () => {
        const iframe = document.getElementById("output");
        const cleanHtml = DOMPurify.sanitize(monacoEditorhtml.current.getValue())
        const cleanCss = DOMPurify.sanitize(monacoEditorcss.current.getValue())
        const cleanJs = DOMPurify.sanitize(monacoEditorjs.current.getValue())
        iframe.contentDocument.body.innerHTML = cleanHtml + "<style>" + cleanCss + "</style>";
        iframe.contentWindow.eval(cleanJs);
      };

      if (mountcomp) {
        setTimeout(() => {
          getEditor();
        }, 1000);
      }

      const HandeleDelte =async (e) =>{
        e.preventDefault();
        try {
          const res = await deleteprojects({id,access_token,username});
          if(res.data){
            toast.success(`Project Deleted`);
          }
         navigate(`/project`)
        } catch (error) {
          toast.error(`Something went wrong `)
        }
      }
    
      const HandleProjectEdit = async (e) => {
        e.preventDefault();
        const dete = new FormData(e.currentTarget);
        const actualData = {
          user: Data.user,
          project_title: dete.get("project_title"),
          project_type: Data.project_type,
          description: dete.get("project_description"),
          html_code: monacoEditorhtml.current.getValue(),
          css_code: monacoEditorcss.current.getValue(),
          js_code: monacoEditorjs.current.getValue(),
        };
    
        try {
          const res = await updateprojects({username,project_title,actualData,id});
          if (res.data) {
            if (save == false) {
              setSave(true);
              setprojectsett((prev) => !prev);
              toast.success(`Project Saved`);
              refetch();
            }
          }
        } catch (error) {
          toast.error(`Something went wrong`)
        }
      };
    
      const HandleProjectSubmit = async (e) => {
        e.preventDefault();
        const actualData = {
          user: Data.user,
          project_title: Data.project_title,
          project_type: Data.project_type,
          description: Data.description,
          html_code: monacoEditorhtml.current.getValue(),
          css_code: monacoEditorcss.current.getValue(),
          js_code: monacoEditorjs.current.getValue(),
        };
    
        try {
          const res = await updateprojects({username,project_title,actualData,id});
          if (res.data) {
            if (save == false) {
              setSave(true);
              toast.success(`Project Updated`);
            }
          }
        } catch (error) {
          toast.error(`Something went wrong`);
        }
      };

  return (
    <>        
          <div
        className="project-container"
        style={{ display: `${projectsett ? "flex" : "none"}`, zIndex : 99999 }}
      >
        <form id="project_formrt" onSubmit={HandleProjectEdit} className="modal">
          <div className="modal__header">
            <span className="modal__title">Edit project</span>
            <button
              onClick={() => {
                setprojectsett((prev) => !prev);
              }}
              className="button button--icon"
            >
              <svg
                width="24"
                viewBox="0 0 24 24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
              </svg>
            </button>
          </div>
          <div className="modal__body">
            <div className="input">
              <label className="input__label">Project title</label>
              <input
                name="project_title"
                placeholder={data.project_title}
                className="input__field"
                value={Data.project_title}
                onChange={(e) => setData({ ...data, project_title: e.target.value })}
                type="text"
              />
              <p className="input__description">
                The title must contain a maximum of 10 characters
              </p>
            </div>
            <div className="input">
              <label className="input__label">Project Type</label>
              <select
                className="input__field"
                name="project_type"
                defaultValue=""
              >
                <option selected value={Data.project_type} disabled>
                 {Data && Data.project_type || Data[0].project_type  == "HCJ" ? "HTML + CSS + JS" : "" }
                </option>

              </select>
              <p className="input__description">
                Project Type Cannot Be Change Once It Created
              </p>
            </div>
            <div className="input">
              <label className="input__label">Description</label>
              <textarea
                name="project_description"
                placeholder={Data.description}
                value={Data.description}
                className="input__field input__field--textarea"
                onChange={(e) => setData({ ...data, description: e.target.value })}
              ></textarea>
              <p className="input__description">
                Give your project a good description so everyone know what's it
                for
              </p>
            </div>
          </div>
          <div className="modal__footer" style={{display:"flex",gap:"30px"}}>
            <button type="submit" className="button button--primary">
              Save
            </button>
            <button onClick={HandeleDelte} className="button button--primary" style={{background:"#ff0000", boxShadow:"1px 1px 20px rgb(255 0 0 / 53%)"}}>
             Delete
            </button>
          </div>
        </form>
      </div>
    <div  className="projects-section" style={{padding:"10px"}}>
    {data && !loading && 
      (<SplitPane split={`${gridi ?  "horizontal" : !screen ? "vertical" : "horizontal"}`}>
        <SplitPane minsize="5%" split={`${gridi  ?  "vertical" : !screen ? "horizontal" : "vertical" }`}>
          <div className="Panal code_editor" >
          <div
                className="code_header "
                style={{ width: `100%` }}
              >
                <span>
                  <span onClick={()=>{setquery("html")}}>HTML</span>
                  {/* {screen && <span onClick={()=>{setquery("css")}}>CSS</span>}
                  {screen && <span onClick={()=>{setquery("js")}}>JS</span>} */}
                </span>
                <span className="grid_butt">
                  {!screen && <button
                    onClick={() => {
                      setgridi((prev) => !prev);
                    }}
                    className="rot_gridi"
                  >
                    { !gridi ? 
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 7.81V16.19C22 19.83 19.83 22 16.19 22H9.75V2H16.19C19.83 2 22 4.17 22 7.81Z" fill="#fff"/>
                      <path d="M8.25 2V22H7.81C4.17 22 2 19.83 2 16.19V7.81C2 4.17 4.17 2 7.81 2H8.25Z" fill="#fff"/>
                    </svg>
                    : 
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#ffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 2V22" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>}
                  </button>}
                  <button
                    onClick={
                      !screen ? () => {
                      setgridi((prev) => !prev);
                    }: ''}
                    className="rot_gridii"
                    style={{rotate:"-90deg"}}
                  >
                    {!gridi ?                     
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#ffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 2V22" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg> : 
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 7.81V16.19C22 19.83 19.83 22 16.19 22H9.75V2H16.19C19.83 2 22 4.17 22 7.81Z" fill="#fff"/>
                      <path d="M8.25 2V22H7.81C4.17 22 2 19.83 2 16.19V7.81C2 4.17 4.17 2 7.81 2H8.25Z" fill="#fff"/>
                    </svg>}
                  </button>
                  { userData && userData.name == Data.username && <button className="pro_save" onClick={HandleProjectSubmit}>
                    <span>{!save ? <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.89 5.87988H5.10999C3.39999 5.87988 2 7.27987 2 8.98987V20.3499C2 21.7999 3.04 22.4199 4.31 21.7099L8.23999 19.5199C8.65999 19.2899 9.34 19.2899 9.75 19.5199L13.68 21.7099C14.95 22.4199 15.99 21.7999 15.99 20.3499V8.98987C16 7.27987 14.6 5.87988 12.89 5.87988Z" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16 8.98987V20.3499C16 21.7999 14.96 22.4099 13.69 21.7099L9.76001 19.5199C9.34001 19.2899 8.65999 19.2899 8.23999 19.5199L4.31 21.7099C3.04 22.4099 2 21.7999 2 20.3499V8.98987C2 7.27987 3.39999 5.87988 5.10999 5.87988H12.89C14.6 5.87988 16 7.27987 16 8.98987Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path opacity="0.4" d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg> :
                                   <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path opacity="0.4" d="M12.89 5.87988H5.10999C3.39999 5.87988 2 7.27987 2 8.98987V20.3499C2 21.7999 3.04 22.4199 4.31 21.7099L8.23999 19.5199C8.65999 19.2899 9.34 19.2899 9.75 19.5199L13.68 21.7099C14.95 22.4199 15.99 21.7999 15.99 20.3499V8.98987C16 7.27987 14.6 5.87988 12.89 5.87988Z" fill="#fff"/>
                                   <path d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z" fill="#fff"/>
                                   </svg>}</span>
                    {save ? "Saved" : "Save"}
                  </button>}
                  {userData && userData.name == Data.username &&  <button  onClick={() => { setprojectsett((prev) => !prev); }} className="pro_sett">
                      <svg width="15px"  height="15px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g id="Iconly/Light/Setting" stroke="#fff"  strokeWidth="2"  fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                            <g id="Setting" transform="translate(2.500000, 1.500000)" stroke="#fff"  strokeWidth="2" >
                                <path d="M18.3066362,6.12356982 L17.6842106,5.04347829 C17.1576365,4.12955711 15.9906873,3.8142761 15.0755149,4.33867279 L15.0755149,4.33867279 C14.6398815,4.59529992 14.1200613,4.66810845 13.6306859,4.54104256 C13.1413105,4.41397667 12.7225749,4.09747295 12.4668193,3.66132725 C12.3022855,3.38410472 12.2138742,3.06835005 12.2105264,2.74599544 L12.2105264,2.74599544 C12.2253694,2.22917739 12.030389,1.72835784 11.6700024,1.3576252 C11.3096158,0.986892553 10.814514,0.777818938 10.2974829,0.778031878 L9.04347831,0.778031878 C8.53694532,0.778031878 8.05129106,0.97987004 7.69397811,1.33890085 C7.33666515,1.69793166 7.13715288,2.18454839 7.13958814,2.69107553 L7.13958814,2.69107553 C7.12457503,3.73688099 6.27245786,4.57676682 5.22654465,4.57665906 C4.90419003,4.57331126 4.58843537,4.48489995 4.31121284,4.32036615 L4.31121284,4.32036615 C3.39604054,3.79596946 2.22909131,4.11125048 1.70251717,5.02517165 L1.03432495,6.12356982 C0.508388616,7.03634945 0.819378585,8.20256183 1.72997713,8.73226549 L1.72997713,8.73226549 C2.32188101,9.07399614 2.68650982,9.70554694 2.68650982,10.3890161 C2.68650982,11.0724852 2.32188101,11.704036 1.72997713,12.0457667 L1.72997713,12.0457667 C0.820534984,12.5718952 0.509205679,13.7352837 1.03432495,14.645309 L1.03432495,14.645309 L1.6659039,15.7345539 C1.9126252,16.1797378 2.3265816,16.5082503 2.81617164,16.6473969 C3.30576167,16.7865435 3.83061824,16.7248517 4.27459956,16.4759726 L4.27459956,16.4759726 C4.71105863,16.2212969 5.23116727,16.1515203 5.71931837,16.2821523 C6.20746948,16.4127843 6.62321383,16.7330005 6.87414191,17.1716248 C7.03867571,17.4488473 7.12708702,17.764602 7.13043482,18.0869566 L7.13043482,18.0869566 C7.13043482,19.1435014 7.98693356,20.0000001 9.04347831,20.0000001 L10.2974829,20.0000001 C11.3504633,20.0000001 12.2054882,19.1490783 12.2105264,18.0961099 L12.2105264,18.0961099 C12.2080776,17.5879925 12.4088433,17.0999783 12.7681408,16.7406809 C13.1274382,16.3813834 13.6154524,16.1806176 14.1235699,16.1830664 C14.4451523,16.1916732 14.7596081,16.2797208 15.0389017,16.4393593 L15.0389017,16.4393593 C15.9516813,16.9652957 17.1178937,16.6543057 17.6475973,15.7437072 L17.6475973,15.7437072 L18.3066362,14.645309 C18.5617324,14.2074528 18.6317479,13.6859659 18.5011783,13.1963297 C18.3706086,12.7066935 18.0502282,12.2893121 17.6109841,12.0366133 L17.6109841,12.0366133 C17.17174,11.7839145 16.8513595,11.3665332 16.7207899,10.876897 C16.5902202,10.3872608 16.6602358,9.86577384 16.9153319,9.42791767 C17.0812195,9.13829096 17.3213574,8.89815312 17.6109841,8.73226549 L17.6109841,8.73226549 C18.5161253,8.20284891 18.8263873,7.04344892 18.3066362,6.13272314 L18.3066362,6.13272314 L18.3066362,6.12356982 Z" id="Path_33946"></path>
                                <circle id="Ellipse_737" cx="9.67505726" cy="10.3890161" r="2.63615562"></circle>
                            </g>
                        </g>
                    </svg>
                  </button>}
                </span>
              </div>
          <Editor className="edit_me"
                height="100%"
                width="100%"
                theme={`${mode === "dark" ? "vs-dark" : "light"}`}
                path={files['index.html'].name}
                defaultLanguage={files['index.html'].language}
                defaultValue={files['index.html'].value}
                onMount={(editor, monaco) => {
                handlecodeh(editor, monaco);
                setmountComp(true);
                }}
                onChange={() => {
                getEditor();
                if (save == true) {
                    setSave(false);
                    setChange(false)
                }
                }}
                acceptSuggestionOnCommitCharacter="true"
                acceptSuggestionOnEnter="on"
                accessibilitySupport="auto"
                autoIndent="false"
                automaticLayout="true"
                colorDecorators="true"
                codeLens="true"
                contextmenu="true"
                cursorBlinking="blink"
                cursorSmoothCaretAnimation="false"
                cursorStyle="line"
                disableLayerHinting="false"
                disableMonospaceOptimizations="false"
                dragAndDrop="false"
                fixedOverflowWidgets="false"
                folding="true"
                foldingStrategy="auto"
                fontLigatures="false"
                formatOnPaste="false"
                formatOnType="false"
                hideCursorInOverviewRuler="false"
                highlightActiveIndentGuide="true"
                links="true"
                mouseWheelZoom="false"
                multiCursorMergeOverlapping="true"
                multiCursorModifier="alt"
                overviewRulerBorder="true"
                overviewRulerLanes="2"
                quickSuggestions="true"
                quickSuggestionsDelay="100"
                readOnly="false"
                renderControlCharacters="false"
                renderFinalNewline="true"
                renderIndentGuides="true"
                renderLineHighlight="all"
                renderWhitespace="none"
                revealHorizontalRightPadding="30"
                roundedSelection="true"
                rulers="[]"
                scrollBeyondLastColumn="5"
                scrollBeyondLastLine="true"
                selectOnLineNumbers="true"
                selectionClipboard="true"
                selectionHighlight="true"
                showFoldingControls="mouseover"
                smoothScrolling="false"
                suggestOnTriggerCharacters="true"
                wordBasedSuggestions="true"
                wordSeparators={"~!@#$%^&*()-=+[{]}|; = '\".<>/?"}
                wordWrap="on"
                wordWrapBreakAfterCharacters="\t})]?|&;"
                wordWrapBreakBeforeCharacters="{([+"
                wordWrapBreakObtrusiveCharacters="."
                wordWrapColumn="80"
                wordWrapMinified="true"
                wrappingIndent="none"
              />
          </div>
          <div className="Panal"  >
          <div
                className="code_header"
                style={{ width: ` ${gridi ? "100%" : "100%"}`, justifyContent: `${screen ? 'unset': 'space-between' }` , gap: `${screen ? '10px': '0' }` }}
              >
                  {/* {screen && <span onClick={()=>{setquery("html")}}>HTML</span>} */}
                  <span onClick={()=>{setquery("css")}}>CSS</span>
                  {/* {screen && <span onClick={()=>{setquery("js")}}>JS</span>} */}
              </div>
          <Editor className="edit_me"
                height={"100%" }
                width="100%"
                theme="vs-dark"
                 path={files["style.css"].name}
                 defaultLanguage={files["style.css"].language}
                 defaultValue={files["style.css"].value}
                 onMount={(editor, monaco) => {
                   handlecodec(editor, monaco);
                 }}
                onChange={() => {
                   getEditor();
                   if (save == true) {
                     setSave(false);
                     setChange(false)
                   }
                 }}
                acceptSuggestionOnCommitCharacter="true"
                acceptSuggestionOnEnter="on"
                accessibilitySupport="auto"
                autoIndent="false"
                automaticLayout="true"
                colorDecorators="true"
                codeLens="true"
                contextmenu="true"
                cursorBlinking="blink"
                cursorSmoothCaretAnimation="false"
                cursorStyle="line"
                disableLayerHinting="false"
                disableMonospaceOptimizations="false"
                dragAndDrop="false"
                fixedOverflowWidgets="false"
                folding="true"
                foldingStrategy="auto"
                fontLigatures="false"
                formatOnPaste="false"
                formatOnType="false"
                hideCursorInOverviewRuler="false"
                highlightActiveIndentGuide="true"
                links="true"
                mouseWheelZoom="false"
                multiCursorMergeOverlapping="true"
                multiCursorModifier="alt"
                overviewRulerBorder="true"
                overviewRulerLanes="2"
                quickSuggestions="true"
                quickSuggestionsDelay="100"
                readOnly="false"
                renderControlCharacters="false"
                renderFinalNewline="true"
                renderIndentGuides="true"
                renderLineHighlight="all"
                renderWhitespace="none"
                revealHorizontalRightPadding="30"
                roundedSelection="true"
                rulers="[]"
                scrollBeyondLastColumn="5"
                scrollBeyondLastLine="true"
                selectOnLineNumbers="true"
                selectionClipboard="true"
                selectionHighlight="true"
                showFoldingControls="mouseover"
                smoothScrolling="false"
                suggestOnTriggerCharacters="true"
                wordBasedSuggestions="true"
                wordSeparators={"~!@#$%^&*()-=+[{]}|; = '\".<>/?"}
                wordWrap="on"
                wordWrapBreakAfterCharacters="\t})]?|&;"
                wordWrapBreakBeforeCharacters="{([+"
                wordWrapBreakObtrusiveCharacters="."
                wordWrapColumn="80"
                wordWrapMinified="true"
                wrappingIndent="none"
              />
          </div>
          <div className="Panal" >
          <div
                className="code_header"
                style={{ width: ` ${gridi ? "100%" : "100%"}`, justifyContent: `${screen ? 'unset': 'space-between' }` , gap: `${screen ? '10px': '0' }`  }}
              >
                  {/* {screen && <span onClick={()=>{setquery("html")}}>HTML</span>}
                  {screen && <span onClick={()=>{setquery("css")}}>CSS</span>} */}
                  <span onClick={()=>{setquery("js")}}>JS</span>
              </div>
          <Editor className="edit_me"
                height={ "100%"}
                width="100%"
                theme="vs-dark"
                 path={files["script.js"].name}
                 defaultLanguage={files["script.js"].language}
                 defaultValue={files["script.js"].value}
                 onMount={(editor, monaco) => {
                   handlecodej(editor, monaco);
                 }}
                 onChange={() => {
                   getEditor();
                   if (save == true) {
                     setSave(false);
                     setChange(false)
                   }
                 }}
                acceptSuggestionOnCommitCharacter="true"
                acceptSuggestionOnEnter="on"
                accessibilitySupport="auto"
                autoIndent="false"
                automaticLayout="true"
                colorDecorators="true"
                codeLens="true"
                contextmenu="true"
                cursorBlinking="blink"
                cursorSmoothCaretAnimation="false"
                cursorStyle="line"
                disableLayerHinting="false"
                disableMonospaceOptimizations="false"
                dragAndDrop="false"
                fixedOverflowWidgets="false"
                folding="true"
                foldingStrategy="auto"
                fontLigatures="false"
                formatOnPaste="false"
                formatOnType="false"
                hideCursorInOverviewRuler="false"
                highlightActiveIndentGuide="true"
                links="true"
                mouseWheelZoom="false"
                multiCursorMergeOverlapping="true"
                multiCursorModifier="alt"
                overviewRulerBorder="true"
                overviewRulerLanes="2"
                quickSuggestions="true"
                quickSuggestionsDelay="100"
                readOnly="false"
                renderControlCharacters="false"
                renderFinalNewline="true"
                renderIndentGuides="true"
                renderLineHighlight="all"
                renderWhitespace="none"
                revealHorizontalRightPadding="30"
                roundedSelection="true"
                rulers="[]"
                scrollBeyondLastColumn="5"
                scrollBeyondLastLine="true"
                selectOnLineNumbers="true"
                selectionClipboard="true"
                selectionHighlight="true"
                showFoldingControls="mouseover"
                smoothScrolling="false"
                suggestOnTriggerCharacters="true"
                wordBasedSuggestions="true"
                wordSeparators={"~!@#$%^&*()-=+[{]}|; = '\".<>/?"}
                wordWrap="on"
                wordWrapBreakAfterCharacters="\t})]?|&;"
                wordWrapBreakBeforeCharacters="{([+"
                wordWrapBreakObtrusiveCharacters="."
                wordWrapColumn="80"
                wordWrapMinified="true"
                wrappingIndent="none"
              />
          </div>
        </SplitPane>
        <div minsize="5%" className="Panal pre_view">
            <iframe id="output" ></iframe>
        </div>
      </SplitPane>)}
    </div>
    </>
  );
};

const Editor_wrapper = ({path, defaultLanguage, defaultValue, getEditor}) =>{
  return(
    <>
              <Editor className="edit_me"
                height={ "100%"}
                width="100%"
                theme="vs-dark"
                path={path}
                defaultLanguage={defaultLanguage}
                defaultValue={defaultValue}
                onMount={(editor, monaco) => {
                    handlecodej(editor, monaco);
                }}
                //  path={files["script.js"].name}
                //  defaultLanguage={files["script.js"].language}
                //  defaultValue={files["script.js"].value}
                //  onMount={(editor, monaco) => {
                //    handlecodej(editor, monaco);
                //  }}
                 onChange={() => {
                   getEditor();
                   if (save == true) {
                     setSave(false);
                   }
                 }}
                acceptSuggestionOnCommitCharacter="true"
                acceptSuggestionOnEnter="on"
                accessibilitySupport="auto"
                autoIndent="false"
                automaticLayout="true"
                colorDecorators="true"
                codeLens="true"
                contextmenu="true"
                cursorBlinking="blink"
                cursorSmoothCaretAnimation="false"
                cursorStyle="line"
                disableLayerHinting="false"
                disableMonospaceOptimizations="false"
                dragAndDrop="false"
                fixedOverflowWidgets="false"
                folding="true"
                foldingStrategy="auto"
                fontLigatures="false"
                formatOnPaste="false"
                formatOnType="false"
                hideCursorInOverviewRuler="false"
                highlightActiveIndentGuide="true"
                links="true"
                mouseWheelZoom="false"
                multiCursorMergeOverlapping="true"
                multiCursorModifier="alt"
                overviewRulerBorder="true"
                overviewRulerLanes="2"
                quickSuggestions="true"
                quickSuggestionsDelay="100"
                readOnly="false"
                renderControlCharacters="false"
                renderFinalNewline="true"
                renderIndentGuides="true"
                renderLineHighlight="all"
                renderWhitespace="none"
                revealHorizontalRightPadding="30"
                roundedSelection="true"
                rulers="[]"
                scrollBeyondLastColumn="5"
                scrollBeyondLastLine="true"
                selectOnLineNumbers="true"
                selectionClipboard="true"
                selectionHighlight="true"
                showFoldingControls="mouseover"
                smoothScrolling="false"
                suggestOnTriggerCharacters="true"
                wordBasedSuggestions="true"
                wordSeparators={"~!@#$%^&*()-=+[{]}|; = '\".<>/?"}
                wordWrap="on"
                wordWrapBreakAfterCharacters="\t})]?|&;"
                wordWrapBreakBeforeCharacters="{([+"
                wordWrapBreakObtrusiveCharacters="."
                wordWrapColumn="80"
                wordWrapMinified="true"
                wrappingIndent="none"
              />
    </>
  )
}

export default IDM;

