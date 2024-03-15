import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService';

export const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        handleLogout(authService.logout);
        navigate('/');
    }, []);

    return null;
}

async function handleLogout(userLogout) {
    try {
        await userLogout();
    } catch (error) {
        alert(error);
    }
}