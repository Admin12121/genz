import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { IoMdWifi } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { BsGrid1X2Fill, BsGrid1X2 } from "react-icons/bs";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useUpdateprojectsMutation, useDeleteprojectsMutation  } from "../../Fetch_Api/Service/User_Auth_Api";
import { IoSave, IoSaveOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Code from "../../Components/Code";
const WebIde = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [updateprojects, { isLoading }] = useUpdateprojectsMutation();
  const [deleteprojects] = useDeleteprojectsMutation();
  const [loading, setLoading] = useState(true);
  const [filename, setfilename] = useState("index.html");
  const [projectsett, setprojectsett] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [mountcomp, setmountComp] = useState(false);
  const [save, setSave] = useState(false);
  const navigate = useNavigate();
  const [query, setquery] = useState('html')
  const monacoEditorhtml = useRef();
  const monacoEditorcss = useRef();
  const monacoEditorjs = useRef();
  const htmlEditorRef = useRef();
  const [gridi, setgridi] = useState(true);
  const [htmlHeight, setHtmlHeight] = useState(gridi ? "88%" : "50%");
  const [cssHeight, setCssHeight] = useState(gridi ? "0%" : "20%");
  const [jsHeight, setJsHeight] = useState(gridi ? "0%" : "20%");
  const [mode, setmode] = useState();
  const api = "http://127.0.0.1:8000/user/project/";
  const [screen ,setScreen] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api + id);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setData({});
      } finally {
        setLoading(false);
      }
    };
    fetchData();

      const handleResize = () => {
        const screenWidth = window.innerWidth;
  
        // Adjust heights based on screen width
        if (screenWidth <= 1100) {
          setHtmlHeight('100%');
          setCssHeight('0%');
          setJsHeight('0%');
          setScreen(true)
          setgridi(true)
        } else {
          setHtmlHeight(gridi ? '88%' : '60%');
          setCssHeight(gridi ? '0%' : '20%');
          setJsHeight(gridi ? '0%' : '20%');
          setScreen(false)
          setgridi(false)
        }
      };
      handleResize();
      // Add event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };


  }, [api, id]);
  useEffect(()=>{
    if(htmlEditorRef.current && gridi){
      htmlEditorRef.current.click();
    }
  },[gridi])
  if (loading) {
    // You can replace this with your own loading animation or message
    return <>
      <div style={{display: "flex", alignItems: "center", justifyContent: 'center', height:"100%" ,width:"100%"}}>
      <Code/>
      </div>
      </>;
  }
  const files = {
    "index.html": {
      name: "index.html",
      language: "html",
      value: data.html_code,
    },
    "style.css": {
      name: "style.css",
      language: "css",
      value: data.css_code,
    },
    "script.js": {
      name: "script.js",
      language: "javascript",
      value: data.js_code,
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
    iframe.contentDocument.body.innerHTML =
    monacoEditorhtml.current.getValue() + "<style>" + monacoEditorcss.current.getValue() + "</style>";
    iframe.contentWindow.eval(monacoEditorjs.current.getValue());
  };
  const handleHtmlClick = () => {
    setHtmlHeight(gridi ? "88%": "60%");
    setCssHeight(gridi ? "0%" : '20%');
    setJsHeight(gridi ? "0%" : '20%');
  };

  const handleCssClick = () => {
    setHtmlHeight(gridi ? "0%" : '20%');
    setCssHeight(gridi ? "88%": "60%");
    setJsHeight(gridi ? "0%" : '20%');
  };

  const handleJsClick = () => {
    setHtmlHeight(gridi ? "0%" : '20%');
    setCssHeight(gridi ? "0%" : '20%');
    setJsHeight(gridi ? "88%": "60%");
  };
  if (mountcomp) {
    setTimeout(() => {
      getEditor();
    }, 1000);
  }
  
  const HandeleDelte =async (e) =>{
    e.preventDefault();
    const actualData = {
      id: data.id,      
    }
    try {
      const res = await deleteprojects(actualData);
     navigate(`/profile/project`)
    } catch (error) {
      console.error("Error in HandleProjectSubmit:", error);
    }
  }
  const HandleProjectEdit = async (e) => {
    e.preventDefault();
    const dete = new FormData(e.currentTarget);
    const actualData = {
      id: data.id,
      user: data.user,
      project_title: dete.get("project_title"),
      project_type: data.project_type,
      description: dete.get("project_description"),
      html_code: monacoEditorhtml.current.getValue(),
      css_code: monacoEditorcss.current.getValue(),
      js_code: monacoEditorjs.current.getValue(),
    };

    try {
      const res = await updateprojects(actualData);
      if (res.data) {
        if (save == false) {
          setSave(true);
          setprojectsett((prev) => !prev);
        }
      }
    } catch (error) {
      console.error("Error in HandleProjectSubmit:", error);
    }
  };
  const HandleProjectSubmit = async (e) => {
    e.preventDefault();
    const actualData = {
      id: data.id,
      user: data.user,
      project_title: data.project_title,
      project_type: data.project_type,
      description: data.description,
      html_code: monacoEditorhtml.current.getValue(),
      css_code: monacoEditorcss.current.getValue(),
      js_code: monacoEditorjs.current.getValue(),
    };

    try {
      const res = await updateprojects(actualData);
      if (res.data) {
        if (save == false) {
          setSave(true);
        }
      }
    } catch (error) {
      console.error("Error in HandleProjectSubmit:", error);
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
                value={data.project_title}
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
                <option selected value={data.project_type} disabled>
                 {data.project_type == "HCJ" ? "HTML + CSS + JS" : ""}
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
                placeholder={data.description}
                value={data.description}
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
      {data && !loading && (
        <div className={`projects-section ${gridi ? screen ? "editori" : "editor" : "editori"}`}>
          <div className={` code_editor ${gridi ?  screen ? "forwebdevv": "forwebdev" : "forwebdevv"}`}>
            <div
             ref={htmlEditorRef}
              className="code_editor code_editor_html"
              style={{ width: ` ${gridi ? "100%" : htmlHeight}` ,display : `${query == 'html' ? 'block': screen ? 'none': 'block'}`}}
              onClick={screen ? '' : handleHtmlClick}
            >
              <div
                className="code_header"
                style={{ width: ` ${gridi ? "100%" : "100%"}` }}
              >
                <span>
                  <span onClick={()=>{setquery("html")}}>HTML</span>
                  {screen && <span onClick={()=>{setquery("css")}}>CSS</span>}
                  {screen && <span onClick={()=>{setquery("js")}}>JS</span>}
                </span>
                <span className="grid_butt">
                  {!screen && <button
                    onClick={() => {
                      setgridi((prev) => !prev);
                    }}
                    className="rot_gridi"
                  >
                    {gridi ? <BsGrid1X2Fill /> : <BsGrid1X2 />}
                  </button>}
                  <button
                    onClick={
                      !screen ? () => {
                      setgridi((prev) => !prev);
                    }: ''}
                    className="rot_gridii"
                  >
                    {gridi ? <BsGrid1X2 /> : <BsGrid1X2Fill />}
                  </button>
                  <button className="pro_save" onClick={HandleProjectSubmit}>
                    <span>{save ? <IoSave /> : <IoSaveOutline />}</span>
                    {save ? "Saved" : "Save"}
                  </button>
                  <button  onClick={() => { setprojectsett((prev) => !prev); }} className="pro_sett">
                    <IoMdSettings />
                  </button>
                </span>
              </div>
              <Editor
                className="edit_me"
                height={gridi ? htmlHeight : "90%"}
                width="100%"
                theme="vs-dark"
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
              <div className="code_footer">
                <button onClick={getEditor} className="run">
                  <span>
                    <IoMdWifi />
                  </span>
                  Go Live
                </button>
              </div>
            </div>
            <div
              className="code_editor code_editor_css"
              style={{ width: ` ${gridi ? "100%" : cssHeight}`, display : `${query == 'css' ? 'block': screen ? 'none': 'block'}` }}
              onClick={screen ? '' : handleCssClick}
            >
              <div
                className="code_header"
                style={{ width: ` ${gridi ? "100%" : "100%"}`, justifyContent: `${screen ? 'unset': 'space-between' }` , gap: `${screen ? '10px': '0' }` }}
              >
                  {screen && <span onClick={()=>{setquery("html")}}>HTML</span>}
                  <span onClick={()=>{setquery("css")}}>CSS</span>
                  {screen && <span onClick={()=>{setquery("js")}}>JS</span>}
              </div>
              <Editor
                className="edit_me"
                height={gridi ? screen ? "100%" :  cssHeight : "90%"}
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
              <div className="code_footer"></div>
            </div>
            <div
              className="code_editor code_editor_js"
              style={{ width: ` ${gridi ? "100%" : jsHeight}` ,display : `${query == 'js' ? 'block':  screen ? 'none': 'block'}`}}
              onClick={screen ? '' : handleJsClick}
            >
              <div
                className="code_header"
                style={{ width: ` ${gridi ? "100%" : "100%"}`, justifyContent: `${screen ? 'unset': 'space-between' }` , gap: `${screen ? '10px': '0' }`  }}
              >
                  {screen && <span onClick={()=>{setquery("html")}}>HTML</span>}
                  {screen && <span onClick={()=>{setquery("css")}}>CSS</span>}
                  <span onClick={()=>{setquery("js")}}>JS</span>
              </div>
              <Editor
                className="edit_me"
                height={gridi ? screen ? "100%" : jsHeight : "90%"}
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
              <div className="code_footer"></div>
            </div>
          </div>
          <div
            style={{ position: `${zoom ? "absolute" : "relative"}` }}
            className="pre_view"
          >
            <span
              onClick={() => {
                setZoom((prev) => !prev);
              }}
              className="pre_but"
            >
              <MdOutlineZoomOutMap />
            </span>
            <iframe
              style={{ height: `${zoom ? "100%" : "95%"}` }}
              id="output"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default WebIde;
