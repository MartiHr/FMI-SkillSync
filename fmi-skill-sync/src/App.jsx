import { Route, Routes } from "react-router-dom";
import { Home } from './components/Home/Home';
import { AuthProvider } from './contexts/AuthContext';
import { Register } from "./components/FormComponents/Register/Register";
import { ChatRoom } from "./components/ChatRoom/ChatRoom";
import { Logout } from "./components/Logout/Logout";

function App() {

    return (
        <AuthProvider>
            <div className="app">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />

                    <Route path='/chat-room/:email' element={<ChatRoom />} />
                    {/* TODO: Add guardProvider -> private routes */}
                    <Route path='/logout' element={<Logout />} />
                </Routes>
            </div>
        </AuthProvider>
    )
}

export default App
