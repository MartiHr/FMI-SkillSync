import { createContext, useContext, useEffect, useState } from "react";
import * as eventsService from "../services/eventsService.js"
import { useNavigate } from "react-router-dom";

export const EventsContext = createContext();

export const EventsProvider = ({
    children,
}) => {

    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        eventsService.getAllAsync()
            .then(result => setEvents(result.slice()));
    }, [])

    const eventCreate = (eventsData) => {
        setEvents([eventsData, ...events]);
        navigate('/events');
    }

    return (
        <EventsContext.Provider value={{
            events,
            eventCreate
        }}>
            {children}
        </EventsContext.Provider>
    );
};

export const useEventsContext = () => {
    const context = useContext(EventsContext);

    return context;
};
