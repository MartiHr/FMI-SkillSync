import { Link } from "react-router-dom"

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";


export const Home = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <h1>Hello, {currentUser?.email}</h1>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Regsiter</Link></li>
                {
                    currentUser 
                 ? <li><Link to="/logout">Logout</Link></li>
                 : null
                }
            </ul>
        </>
    )
}