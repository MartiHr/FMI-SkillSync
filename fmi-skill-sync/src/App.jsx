import { Route, Routes } from "react-router-dom";
import { Home } from './components/Home/Home';
import { Forum } from './components/Forum/Forum';
import { Header } from './components/Header/Header';
import { AuthProvider } from './contexts/AuthContext';
import { ChatRoom } from "./components/ChatRoom/ChatRoom";
import { Login } from "./components/FormComponents/Login/Login";
import { Register } from './components/FormComponents/Register/Register';
import { Logout } from "./components/Logout/Logout";
import GuestGuard from "./components/Common/GuestGuard";
import UserGuard from "./components/Common/UserGuard";
import { Discussion } from "./components/Forum/Discussion/Discussion";
import { ForumProvider } from "./contexts/ForumContext";
import { Events } from "./components/Events/Events.jsx";
import { CreateTopic } from "./components/FormComponents/CreateTopic/CreateTopic.jsx";
import { NotFound } from "./components/NotFound/NotFound.jsx";
import { EventDetails } from "./components/Events/EventDetails/EventDetails.jsx";
import { CreateEvent } from "./components/FormComponents/CreateEvent/CreateEvent.jsx";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationsEn from './infrastructureUtils/translation/translationsEn.json'
import translationsBg from './infrastructureUtils/translation/translationsBg.json'
import { EventsProvider } from "./contexts/EventsContext.jsx";
import { Requests } from "./components/Requests/Requests.jsx";
import { AcceptRequest } from "./components/FormComponents/AcceptRequest/AcceptRequest.jsx";
import { EditTopic } from "./components/FormComponents/EditTopic/EditTopic.jsx";
import { MyEvents } from "./components/Events/MyEvents/MyEvents.jsx";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: translationsEn },
            bg: { translation: translationsBg },
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: { escapeValue: false },
    });


function App() {
    return (
        <>
            <AuthProvider>
                <div className="app">
                    <Header />
                    <section className='main-section'>
                        <ForumProvider>
                            <EventsProvider>
                                <Routes>
                                    <Route path='/' element={<Home />} />
                                    {/* TODO Move in */}
                                    <Route path='/events/details/:id' element={<EventDetails />} />

                                    <Route path='/chat-room/:email' element={<ChatRoom />} />
                                    {/* PUT in guard */}
                                    <Route path='/createEvent' element={<CreateEvent />} />
                                    <Route path='/accept-request/:id' element={<AcceptRequest />} />
                                    <Route path='/logout' element={<Logout />} />
                                    <Route path='/createTopic' element={<CreateTopic />} />
                                    <Route path='/discussion/:id' element={<Discussion />} />
                                    <Route path='/forum' element={<Forum />} />
                                    <Route path='/editTopic/:id' element={<EditTopic />} />
                                    <Route path='/events' element={<Events />} />
                                    <Route path='/my-requests' element={< Requests />} />
                                    <Route path='/accept-request' element={< AcceptRequest />} />
                                    <Route path='/my-events' element={< MyEvents />} />

                                    <Route element={<UserGuard />}>
                                        <Route path='/register' element={<Register />} />
                                        <Route path='/login' element={<Login />} />
                                    </Route>

                                    <Route path='*' element={<NotFound />} />

                                </Routes>
                            </EventsProvider>
                        </ForumProvider>
                    </section>
                </div>
            </AuthProvider>
        </>
    );
}

export default App
