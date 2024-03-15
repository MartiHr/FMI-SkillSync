import { Route, Routes } from "react-router-dom";
import { Home } from './components/Home/Home';
import { AuthProvider } from './contexts/AuthContext';

function App() {

    return (
        <AuthProvider>
            <div className="app">
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
            </div>
        </AuthProvider>
    )
}

export default App
