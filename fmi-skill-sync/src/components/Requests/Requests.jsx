import { RequestItem } from "./RequestItem/RequestItem";
import requestsStyles from './Requests.module.css';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import * as requestsService from '../../services/requestsService.js';
import * as eventsService from '../../services/eventsService.js';
import { useNavigate } from "react-router";

let cx = classNames.bind(requestsStyles);

export const Requests = () => {
    const [requests, setRequests] = useState([]);
    const { currentUser } = useAuthContext();
    const navigate = useNavigate();

    const deleteRequest = (requestId) => {
        requestsService.deleteRequest(requestId)
            .then(res => {
                setRequests(requests => requests.filter(t => t.id !== requestId));
            })
            .catch(err => {
                console.log(err);
            });
    }

    const acceptRequest = (requestId) => {
        const currRequest = requests.find(t => t.id === requestId);
        const eventId = currRequest.eventId;

        requestsService.deleteRequestsForEvent(eventId)
            .then(res => {
                setRequests(requests => requests.filter(t => t.eventId !== eventId));
            })
            .catch(err => {
                console.log(err);
            });

        eventsService.setTeacherToEvent(eventId, currRequest?.from)
            .then(res => { console.log("succes") })
            .catch(err => { console.log(err) });
        // Redirect to Page for data/time and location (update the event)

        navigate(`/accept-request/${eventId}`);
    }

    useEffect(() => {
        requestsService.getAllRequestsForUser(currentUser?.email)
            .then(res => {
                setRequests(res);
            })
            .catch(err => {
                console.log(err);
            })
    }, [currentUser?.email]);


    return (
        <div className={cx("requests-container")}>
            <h1>Your requests</h1>
            {requests?.length > 0 ? requests.map(e => (
                <RequestItem
                    key={e.id}
                    id={e.id}
                    from={e.from}
                    eventTitle={e.eventTitle}
                    deleteRequest={deleteRequest}
                    acceptRequest={acceptRequest}
                />
            )) : <h1>No requests yet!</h1>}
        </div>
    );
} 
