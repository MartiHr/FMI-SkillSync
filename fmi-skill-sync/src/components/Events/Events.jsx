import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Confetti } from "../Common/Confetti/Confetti";

export const Events = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <h1>Events</h1>
            <Confetti/>
        </>
    )
}