import { Route, Routes } from "react-router-dom";
import { Home } from './components/Home/Home';
import { Register } from './components/FormComponents/Register/Register';
import { Forum } from './components/Forum/Forum';
import { Login } from './components/FormComponents/Login/Login';
import { Header } from './components/Header/Header';
import { AuthProvider } from './contexts/AuthContext';
import { ChatRoom } from "./components/ChatRoom/ChatRoom";
import { Logout } from "./components/Logout/Logout";
import { Discussion } from "./components/Forum/Discussion/Discussion";
import { ForumProvider } from "./contexts/ForumContext";

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
                                <Route path='/register' element={<Register />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/forum' element={<Forum />} />
                                <Route path='/discussion/:id' element={<Discussion />} />
                                {/* TODO: Don't use email */}
                                <Route path='/chat-room/:email' element={<ChatRoom />} />
                                {/* TODO: Add guardProvider -> private routes */}
                                <Route path='/logout' element={<Logout />} />
                            </Routes>
                        </ForumProvider>
                    </section>
                </div>
            </AuthProvider>
        </>
    );
}

export default App
