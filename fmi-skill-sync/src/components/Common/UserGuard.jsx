import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const UserGuard = ({children}) => {
    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Navigate to="/" replace />
    }

    return children ? children : <Outlet />  
};

export default UserGuard;