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

function App() {
    return (
        <>
            <AuthProvider>
                <div className="app">
                    <Header />
                    <section className='main-section'>
                        <ForumProvider>
                            <Routes>
                                <Route path='/' element={<Home />} />
                                {/* TODO Move in */}
                                <Route path='/events/details/:id' element={<EventDetails />} />

                                {/* PUT in guard */}
                                <Route path='/createEvent' element={<CreateEvent />} />

                                <Route element={<GuestGuard />}>
                                    <Route path='/logout' element={<Logout />} />
                                    <Route path='/createTopic' element={<CreateTopic />} />
                                    <Route path='/discussion/:id' element={<Discussion />} />
                                    <Route path='/forum' element={<Forum />} />
                                    <Route path='/chat-room/:email' element={<ChatRoom />} />
                                    <Route path='/events' element={<Events />} />
                                </Route>

                                <Route element={<UserGuard />}>
                                    <Route path='/register' element={<Register />} />
                                    <Route path='/login' element={<Login />} />
                                </Route>

                                <Route path='*' element={<NotFound />} />

                            </Routes>
                        </ForumProvider>
                    </section>
                </div>
            </AuthProvider>
        </>
    );
}

export default App
