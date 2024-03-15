import { Route, Routes } from "react-router-dom";
import { Home } from './components/Home/Home';
import { AuthProvider } from './contexts/AuthContext';
import { Register } from "./components/FormComponents/Register/Register";

function App() {

    return (
        <AuthProvider>
            <div className="app">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </div>
        </AuthProvider>
    )
}

export default App
