import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

import { auth } from "../firebase/base";

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // const uid = user.uid;
                const unsub = setCurrentUser(user);
                return unsub;
            } else {
                // User is signed out
                const unsub = setCurrentUser(null);
                return unsub;
            }
        })
    }, []);

    return currentUser;
}