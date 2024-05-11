import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'sonner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../../Components/Loader';
import Load from '../../Components/Load';
import './coder.scss';
import { useProjectsLikeMutation, useGetLoggedUserQuery } from "../../Fetch_Api/Service/User_Auth_Api";

const PAGE_NUMBER = 1;

const Code = () => {
    const [projectData, setProjectData] = useState([]);
    const [page, setPage] = useState(PAGE_NUMBER);
    const [hasMore, setHasMore] = useState(true);
    const [total, setTotal] = useState(0);
    const [drop, setDrop] = useState(false);
    const [query, setQuery] = useState('');
    const [short, setShort] = useState('Randomized');
    const { data: userData, refetch: refetchUser } = useGetLoggedUserQuery();
    const [likedProjects, setLikedProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        refetchUser();
    }, []);

    useEffect(() => {
        fetchData();
    }, [short, query]);

    useEffect(() => {
        if (page > 1) {
            fetchMore();
        }
    }, [page]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://project.vickytajpuriya.com/user/projects/?filter=${query ? query : short}`);
            if (page === 1) {
                setProjectData(response.data.results);
            } else {
                setProjectData(prev => [...prev, ...response.data.results]);
            }
            setTotal(response.data.count);
            setHasMore(response.data.next !== null);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const fetchMore = async () => {
        const response = await axios.get(
            `https://project.vickytajpuriya.com/user/projects/?filter=${query ? query : short}&page=${page}`
        );
        setProjectData(prev => [...prev, ...response.data.results]);
    };

    const fetchPage = () => {
        if (projectData.length >= total) {
            setHasMore(false);
        } else {
            setPage(prev => prev + 1);
        }
    };

    const handleInputchange = (event) => {
        setQuery(event.target.value);
    };

    const handleLike = async (id) => {
        try {
            const response = await axios.post(`https://project.vickytajpuriya.com/user/projects/like/${id}`);
            if (response.data.msg) {
                toast.success(response.data.msg);
                // Update local liked projects state
                setLikedProjects(prev => [...prev, id]);
            }
        } catch (error) {
            console.error("Error liking project:", error);
        }
    };

    const isLikedByUser = (id) => likedProjects.includes(id);

    return (
        <div id="scrollableDiv" className="projects-section project-view">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="project-tabs">
                            <div className="projects-title">
                                <h2>Projects</h2>
                            </div>
                            <div className="search-box">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    onChange={handleInputchange}
                                    value={query}
                                />
                            </div>
                            <div className="short-by">
                                <select onChange={(e) => setShort(e.target.value)}>
                                    <option value="Randomized">Randomized</option>
                                    <option value="Newest">Newest</option>
                                    <option value="Oldest">Oldest</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {projectData.map((project) => (
                        <div className="col-md-3" key={project.id}>
                            <div className="project-item">
                                <div className="project-img">
                                    <img src={project.image} alt={project.title} />
                                </div>
                                <div className="project-content">
                                    <h4>{project.title}</h4>
                                    <p>{project.description}</p>
                                    <div className="project-footer">
                                        <button onClick={() => handleLike(project.id)}>
                                            {isLikedByUser(project.id) ? 'Unlike' : 'Like'}
                                        </button>
                                        <Link to={`/project/${project.id}`}>View Details</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {loading && <Loader />}
                {hasMore && (
                    <button onClick={fetchPage} className="load-more">
                        Load More
                    </button>
                )}
            </div>
        </div>
    );
};

export default Code;
