import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import axios from "axios";
import {toast } from 'sonner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../../Components/Loader';
import Load from '../../Components/Load';
import './coder.scss';
import {useProjectsLikeMutation,useGetLoggedUserQuery} from "../../Fetch_Api/Service/User_Auth_Api"

const PAGE_NUMBER = 1;
const Code = () => {
    const [projectData, setprojectData] = useState([]);
    const [page, setPage] = useState(PAGE_NUMBER);
    const [hasmore, sethasMore] = useState(true)
    const [total, setTotal] = useState(0)
    const [drop, setDrop] = useState(false)
    const [query, setQuery] = useState('')
    const [short, setShort] = useState('Randomized')
    const {data,refetch} = useGetLoggedUserQuery()
    const [userId, setUserId] = useState()

    useEffect(()=>{
            refetch()
            if(data){
                setUserId(data.id)
            }
      },[data])
    useEffect(() => {
        setQuery('')
        setPage(PAGE_NUMBER); // Reset page to 1 whenever short changes
        fetchData();
    }, [short]);

    const handleInputchange = (event) => {
        setQuery(event.target.value);
    };

    const fetchData = async () => {
        try {
             const response = await axios.get(`${import.meta.env.VITE_KEY_BACKEND_DOMAIN}/user/projects/?filter=${query ? query : short}`);
            if (page === 1) {
                setprojectData(response.data.results);
            } else {
                setprojectData(prev => [...prev, ...response.data.results]);
            }
            setTotal(response.data.count);
            sethasMore(response.data.next !== null);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const fetchmore = async  () =>  {
        const response = await axios.get( 
            `${import.meta.env.VITE_KEY_BACKEND_DOMAIN}/user/projects/?filter=${query ? query : short}&page=${page}`
        );

        setprojectData((prev) => {
            return [...prev, ...response.data.results];
        });
    }
    useEffect(()=>{
        if(page>1){
            fetchmore()
        }
    },[page])

    const fetchpage =() =>{
        if(projectData.length >= total){
            sethasMore(false)
        }else{
            setPage(prev => prev + 1)
        }
    }
    useEffect(() => {
        loadProjectData();
      }, [projectData]);
    
      const loadProjectData = () => {
        if (projectData) {
          projectData.forEach(project => {
            updateIframeContent(project);
          });
        }
      };
    
      const updateIframeContent = (project) => {
        const iframeId = `iframe_${project.id}`;
        const iframe = document.getElementById(iframeId);
        
        if (iframe) {
          iframe.contentDocument.body.innerHTML = project.html_code + "<style>" + project.css_code + "</style>";
        }
      };

      const handleLike = (projectId) => {
        setprojectData((prevData) =>
            prevData.map((project) =>
                project.id === projectId ? { ...project, likes: project.likes.includes(userId) ? project.likes.filter((id) => id !== userId) : [...project.likes, userId] } : project
            )
        );
    };
    return (
       <div id="scrollableDiv" className="projects-section project-view">
        <div className="filtering_button_section">
            <span className='filtring_button' onClick={() => setDrop(prev => !prev)}> 
                <svg width="20px"  height="20px"  viewBox="0 0 24 24"  fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.53723 12.4211L8.5351 12.4243L3.68936 7.2_7177C3.24719 6.80158 3 6.17647 3 5.52644V4.5904C3 3.71286 3.70108 3 4.56517 3H12.0005" stroke="var(--main-color)"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.99902 16.0233V20.5952C9.99902 20.9007 10.3187 21.0957 10.584 20.9516L13.3435 19.4479C13.7601 19.2204 14.0201 18.7784 14.0201 18.2984V16.0114C14.0201 14.6691 14.539 13.3799 15.4659 12.4243L20.3117 7.27177C20.7528 6.80158 21 6.17647 21 5.52644V4.5904C21 3.71286 20.3 3 19.4359 3H15.7182" stroke="var(--main-color)"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Short : {short} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path></svg>
                { drop && <span className='filter_drop_down'> 
                <h2 onClick={() => setShort("Randomized")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M12 12h.01M16 8h.01M8 8h.01M8 16h.01M16 16h.01M11 21h2c2.8 0 4.2 0 5.27-.545a5 5 0 0 0 2.185-2.185C21 17.2 21 15.8 21 13v-2c0-2.8 0-4.2-.545-5.27a5 5 0 0 0-2.185-2.185C17.2 3 15.8 3 13 3h-2c-2.8 0-4.2 0-5.27.545A5 5 0 0 0 3.545 5.73C3 6.8 3 8.2 3 11v2c0 2.8 0 4.2.545 5.27a5 5 0 0 0 2.185 2.185C6.8 21 8.2 21 11 21Z"></path></svg>
                    Randomized</h2>
                <h2 onClick={() => setShort("Stars")}>
                    <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="Iconly/Light-Outline/Star" stroke="none" strokeWidth="2" fill="none" fillRule="evenodd"><path d="M11.7499161,4.5 C11.6589161,4.5 11.4349161,4.525 11.3159161,4.763 L9.48991609,8.414 C9.20091609,8.991 8.64391609,9.392 7.99991609,9.484 L3.91191609,10.073 C3.64191609,10.112 3.54991609,10.312 3.52191609,10.396 C3.49691609,10.477 3.45691609,10.683 3.64291609,10.861 L6.59891609,13.701 C7.06991609,14.154 7.28391609,14.807 7.17191609,15.446 L6.47591609,19.456 C6.43291609,19.707 6.58991609,19.853 6.65991609,19.903 C6.73391609,19.959 6.93191609,20.07 7.17691609,19.942 L10.8319161,18.047 C11.4079161,17.75 12.0939161,17.75 12.6679161,18.047 L16.3219161,19.941 C16.5679161,20.068 16.7659161,19.957 16.8409161,19.903 C16.9109161,19.853 17.0679161,19.707 17.0249161,19.456 L16.3269161,15.446 C16.2149161,14.807 16.4289161,14.154 16.8999161,13.701 L19.8559161,10.861 C20.0429161,10.683 20.0029161,10.476 19.9769161,10.396 C19.9499161,10.312 19.8579161,10.112 19.5879161,10.073 L15.4999161,9.484 C14.8569161,9.392 14.2999161,8.991 14.0109161,8.413 L12.1829161,4.763 C12.0649161,4.525 11.8409161,4.5 11.7499161,4.5 M6.94691609,21.5 C6.53391609,21.5 6.12391609,21.37 5.77291609,21.114 C5.16691609,20.67 4.86991609,19.937 4.99891609,19.199 L5.69491609,15.189 C5.72091609,15.04 5.66991609,14.889 5.55991609,14.783 L2.60391609,11.943 C2.05991609,11.422 1.86491609,10.652 2.09491609,9.937 C2.32691609,9.214 2.94091609,8.697 3.69791609,8.589 L7.78591609,8 C7.94391609,7.978 8.07991609,7.881 8.14791609,7.743 L9.97491609,4.091 C10.3119161,3.418 10.9919161,3 11.7499161,3 L11.7499161,3 C12.5079161,3 13.1879161,3.418 13.5249161,4.091 L15.3529161,7.742 C15.4219161,7.881 15.5569161,7.978 15.7139161,8 L19.8019161,8.589 C20.5589161,8.697 21.1729161,9.214 21.4049161,9.937 C21.6349161,10.652 21.4389161,11.422 20.8949161,11.943 L17.9389161,14.783 C17.8289161,14.889 17.7789161,15.04 17.8049161,15.188 L18.5019161,19.199 C18.6299161,19.938 18.3329161,20.671 17.7259161,21.114 C17.1109161,21.565 16.3099161,21.626 15.6309161,21.272 L11.9779161,19.379 C11.8349161,19.305 11.6639161,19.305 11.5209161,19.379 L7.86791609,21.273 C7.57591609,21.425 7.26091609,21.5 6.94691609,21.5" id="Star" fill="var(--main-color)"></path></g></svg>
                    Stars</h2>
                <h2 onClick={() => setShort("Views")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M3 14c0-2.188 2.7-7 9-7s9 4.813 9 7m-6 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path></svg>
                    Views</h2>
                <h2 onClick={() => setShort("Recent")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M8 2v2.128M8 6V4.128M16 2v2.128M16 6V4.128M20.96 10c.04.788.04 1.755.04 3 0 2.796 0 4.194-.457 5.296a6 6 0 0 1-3.247 3.247C16.194 22 14.796 22 12 22c-2.796 0-4.193 0-5.296-.457a6 6 0 0 1-3.247-3.247C3 17.194 3 15.796 3 13c0-1.245 0-2.212.04-3m17.92 0c-.05-.982-.163-1.684-.417-2.296a6 6 0 0 0-3.247-3.247A5.136 5.136 0 0 0 16 4.127M20.96 10H3.04m0 0c.05-.982.163-1.684.417-2.296a6 6 0 0 1 3.247-3.247A5.135 5.135 0 0 1 8 4.127m0 0C8.941 4 10.172 4 12 4c1.828 0 3.059 0 4 .128"></path></svg>
                    Recent</h2>
                </span>}
            </span>
            
            <div className="search-wrapper data_searcher" >
                <input className="search-input" value={query} type="text" onChange={handleInputchange} placeholder="Search"/>
                <svg
                    onClick={fetchData}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="feather feather-search"
                    viewBox="0 0 24 24"
                    style={{cursor:"pointer"}}
                >
                    <defs></defs>
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="M21 21l-4.35-4.35"></path>
                </svg>
            </div>
        </div>
       {projectData &&  <InfiniteScroll
           dataLength={projectData.length}
           next={fetchpage}
           hasMore={hasmore}
           loader={<Data_loader/>}
           scrollableTarget="scrollableDiv"
           endMessage={
            <p style={{ textAlign: 'center', width: "100%", height: "50px" }}>
              <b>No more Projects</b>
            </p>
          }
         >
           {projectData.map((project, index) => (
             <ProjectCard key={`${project.id}_${index}`} userId={userId} project={project} handleLike={handleLike}  />
           ))}
         </InfiniteScroll>}
       </div>
    );
  };
  

 const ProjectCard = ({ project,userId, handleLike }) => {
     const { id, username, project_title, profile, html_code, css_code, views, likes } = project;
     const navigate = useNavigate();
     const [likedProjects, setLikedProjects] = useState(false);
     const [AddLike, {isLoading}] = useProjectsLikeMutation();

     const Handel_Like = async(id) =>{
        const res = await AddLike(id);
        if(res.data){
             toast.success(res.data.msg);
             handleLike(id);
            }
            else{
                console.log(res.error)
                toast.success(res.error);
        }
     }

     useEffect(()=>{
        if(project && likes && userId && likes.includes(userId)){
            setLikedProjects(true)
        }else{
            setLikedProjects(false) 
        }
     },[project, likes, userId])
     return (
         <div className="Course_wrapper pro-course-wrapper" key={id}>
             <div className="Course_card proj-course-card">
                 <div className="course_image pro-course-img">
                     <iframe id={`iframe_${id}`} frameBorder="0"></iframe>
                     <div onClick={() => navigate(`/code/${username}/${project_title}`)} className="iframe_link"></div>
                 </div>
                 <div className="text_area">
                     <span className="user-project">
                         <span>
                             <Link to={`/${username}`}>
                                 <img src={`${import.meta.env.VITE_KEY_BACKEND_DOMAIN}/${profile}`} alt="" />
                             </Link>
                         </span>
                         <span>
                             <h1>{project_title}</h1>
                             <Link to={`/${username}`} style={{ color: "var(--main-color)" }}>
                                 <p>{username}</p>
                             </Link>
                         </span>
                     </span>
                     <span className="project-view" style={{ gap: "10px" }}>
                         <p>{views} views</p>
                         <span className="project-star" onClick={() => Handel_Like(id)}>
                               {!likedProjects   ?  <svg width="15px" height="15px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                 <g id="Iconly/Light-Outline/Star" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                     <path d="M11.7499161,4.5 C11.6589161,4.5 11.4349161,4.525 11.3159161,4.763 L9.48991609,8.414 C9.20091609,8.991 8.64391609,9.392 7.99991609,9.484 L3.91191609,10.073 C3.64191609,10.112 3.54991609,10.312 3.52191609,10.396 C3.49691609,10.477 3.45691609,10.683 3.64291609,10.861 L6.59891609,13.701 C7.06991609,14.154 7.28391609,14.807 7.17191609,15.446 L6.47591609,19.456 C6.43291609,19.707 6.58991609,19.853 6.65991609,19.903 C6.73391609,19.959 6.93191609,20.07 7.17691609,19.942 L10.8319161,18.047 C11.4079161,17.75 12.0939161,17.75 12.6679161,18.047 L16.3219161,19.941 C16.5679161,20.068 16.7659161,19.957 16.8409161,19.903 C16.9109161,19.853 17.0679161,19.707 17.0249161,19.456 L16.3269161,15.446 C16.2149161,14.807 16.4289161,14.154 16.8999161,13.701 L19.8559161,10.861 C20.0429161,10.683 20.0029161,10.476 19.9769161,10.396 C19.9499161,10.312 19.8579161,10.112 19.5879161,10.073 L15.4999161,9.484 C14.8569161,9.392 14.2999161,8.991 14.0109161,8.413 L12.1829161,4.763 C12.0649161,4.525 11.8409161,4.5 11.7499161,4.5 M6.94691609,21.5 C6.53391609,21.5 6.12391609,21.37 5.77291609,21.114 C5.16691609,20.67 4.86991609,19.937 4.99891609,19.199 L5.69491609,15.189 C5.72091609,15.04 5.66991609,14.889 5.55991609,14.783 L2.60391609,11.943 C2.05991609,11.422 1.86491609,10.652 2.09491609,9.937 C2.32691609,9.214 2.94091609,8.697 3.69791609,8.589 L7.78591609,8 C7.94391609,7.978 8.07991609,7.881 8.14791609,7.743 L9.97491609,4.091 C10.3119161,3.418 10.9919161,3 11.7499161,3 L11.7499161,3 C12.5079161,3 13.1879161,3.418 13.5249161,4.091 L15.3529161,7.742 C15.4219161,7.881 15.5569161,7.978 15.7139161,8 L19.8019161,8.589 C20.5589161,8.697 21.1729161,9.214 21.4049161,9.937 C21.6349161,10.652 21.4389161,11.422 20.8949161,11.943 L17.9389161,14.783 C17.8289161,14.889 17.7789161,15.04 17.8049161,15.188 L18.5019161,19.199 C18.6299161,19.938 18.3329161,20.671 17.7259161,21.114 C17.1109161,21.565 16.3099161,21.626 15.6309161,21.272 L11.9779161,19.379 C11.8349161,19.305 11.6639161,19.305 11.5209161,19.379 L7.86791609,21.273 C7.57591609,21.425 7.26091609,21.5 6.94691609,21.5"
                                                 id="Star"
                                                 fill={`${likedProjects ? "orange" : "var(--main-color)"} `}
                                             ></path>
                                         </g>
                                     </svg> : 
                                     <svg width="15px"  height="15px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                     <g id="Iconly/Bold/Star" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                         <g id="Star" transform="translate(1.999624, 2.500100)" fill="orange"  fillRule="nonzero">
                                             <path d="M15.9188758,11.82 C15.6598758,12.071 15.5408758,12.434 15.5998758,12.79 L16.4888758,17.71 C16.5638758,18.127 16.3878758,18.549 16.0388758,18.79 C15.6968758,19.04 15.2418758,19.07 14.8688758,18.87 L10.4398758,16.56 C10.2858758,16.478 10.1148758,16.434 9.93987581,16.429 L9.66887581,16.429 C9.57487581,16.443 9.48287581,16.473 9.39887581,16.519 L4.96887581,18.84 C4.74987581,18.95 4.50187581,18.989 4.25887581,18.95 C3.66687581,18.838 3.27187581,18.274 3.36887581,17.679 L4.25887581,12.759 C4.31787581,12.4 4.19887581,12.035 3.93987581,11.78 L0.32887581,8.28 C0.0268758104,7.987 -0.0781241896,7.547 0.0598758104,7.15 C0.19387581,6.754 0.53587581,6.465 0.94887581,6.4 L5.91887581,5.679 C6.29687581,5.64 6.62887581,5.41 6.79887581,5.07 L8.98887581,0.58 C9.04087581,0.48 9.10787581,0.388 9.18887581,0.31 L9.27887581,0.24 C9.32587581,0.188 9.37987581,0.145 9.43987581,0.11 L9.54887581,0.07 L9.71887581,5.32907052e-15 L10.1398758,5.32907052e-15 C10.5158758,0.039 10.8468758,0.264 11.0198758,0.6 L13.2388758,5.07 C13.3988758,5.397 13.7098758,5.624 14.0688758,5.679 L19.0388758,6.4 C19.4588758,6.46 19.8098758,6.75 19.9488758,7.15 C20.0798758,7.551 19.9668758,7.991 19.6588758,8.28 L15.9188758,11.82 Z"></path>
                                         </g>
                                     </g>
                                    </svg>
                                     }
                                     <p>star |</p>
                                     <p>{likes.length}</p>
                                 </span>
                             </span>
                         </div>
                     </div>
         </div>
     );
 };

 const Data_loader = ({}) =>{
    return(
        <>
          <Load/>
           <Load/>
           <Load/>
           <span style={{width:"100%",    display: "flex", alignItems: "center", justifyContent: "center", height: "100px"}}> 
            <Loader />
           </span>
        </>
    )
 }

export default Code;
