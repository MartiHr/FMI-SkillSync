import { RequestItem } from "./RequestItem/RequestItem";
import requestsStyles from './Requests.module.css';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import * as requestsService from '../../services/requestsService.js';

let cx = classNames.bind(requestsStyles);

export const Requests = () => {
    const [requests, setRequests] = useState([]);
    const { currentUser } = useAuthContext();

    useEffect(() => {
        requestsService.getAllRequestsForUser(currentUser?.email)
            .then(res => {
                console.log(res);
                setRequests(res);
            })
            .catch(err => {
                console.log(err);
            })
    }, [currentUser?.email]);

    const handleAcceptTeacher = (index) => {
        console.log(`Clicked with parameters: ${index}`);
    };

    return (
        <div className={cx("requests-container")}>
            <h1>Your request</h1>
            {requests.map(e => (
                <RequestItem
                    key={e.id}
                    onClickHandler={handleAcceptTeacher}
                    from={e.from}
                    eventTitle={e.eventTitle}
                />
            ))}
        </div>
    );
} 
