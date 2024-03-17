import { createContext, useContext,useEffect, useState } from "react";
import * as forumService from "../services/forumService.js"
import { useNavigate } from "react-router-dom";

export const ForumContext = createContext();

export const ForumProvider = ({
    children,
}) => {

    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);

    useEffect(() => {
         forumService.getAllTopics()
            .then(result => setTopics(result.slice()));
    }, [])

    const topicCreate = (topicData) => {
        setTopics([topicData, ...topics]);
        navigate('/forum');
    }

    const topicDelete = (topicId) => {
        return setTopics(topics => topics.filter(t => t.id !== topicId));
    }

    const topicSelect = (topicId) => {
        return topics.find(t => t.id === topicId) || {};
    };

    const topicDetails = (topicId, data) => {
        return   topics.map(t => t.id === topicId ? data : t);
    }

    const topicEdit = (topicId, topicData) => {
        setTopics(topics.map(t => t.id === topicId ? {...t, ...topicData} : t));
        console.log(topics);
    }


    return (
        <ForumContext.Provider value={{
            topics,
            topicCreate,
            topicDelete,
            topicDetails,
            topicEdit,
            topicSelect,
        }}>
            {children}
        </ForumContext.Provider>  
    );
};

export const useForumContext = () => {
    const context = useContext(ForumContext);

    return context;
};
