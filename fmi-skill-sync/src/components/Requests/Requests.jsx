import { RequestItem } from "./RequestItem/RequestItem";
import requestsStyles from './Requests.module.css';
import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext.jsx';

let cx = classNames.bind(requestsStyles);

export const Requests = () => {


    const [requests, setRequests] = useState([]);
    const { currentUser } = useAuthContext();

    useEffect(() => {

        //get event and check if the user is the event offerer
        setRequests([{ key: 1, req: { from: "vladi", time: "12,123,32" } },{ key: 1, req: { from: "vladi", time: "12,123,32" } },{ key: 1, req: { from: "vladi", time: "12,123,32" } },{ key: 1, req: { from: "vladi", time: "12,123,32" } }]);
    },[]);

    const handleAcceptTeacher = (index) => {
        console.log(`Clicked with parameters: ${index}`);
    };


    return (
        <div className={cx("requests-container")}>
            {requests.map((currentReq, index) => (
                <RequestItem
                    key={index}
                    onClickHandler={() => handleAcceptTeacher(index)}
                    req={currentReq}
                />
            ))}
        </div>
    );
} 
