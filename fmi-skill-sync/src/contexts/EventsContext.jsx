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
        eventsService.getAllEvents()
            .then(result => setEvents(result.slice()));
    }, [])

    const eventCreate = (eventsData) => {
        setEvents([eventsData, ...events]);
        navigate('/events');
    }
    
    const eventDelete = (eventId) => {
        return setEvents(events => events.filter(t => t.id !== eventId));
    }

    const eventSelect = (eventId) => {
        return events.find(e => e.id === eventId) || {};
    };

    const eventEdit = (eventId, eventData) => {
        return setEvents(events.map(e => e.id === eventId ? {...e, ...eventData} : e));
    }

    return (
        <EventsContext.Provider value={{
            events,
            eventCreate,
            eventDelete,
            eventSelect,
            eventEdit,
        }}>
            {children}
        </EventsContext.Provider>
    );
};

export const useEventsContext = () => {
    const context = useContext(EventsContext);

    return context;
};
