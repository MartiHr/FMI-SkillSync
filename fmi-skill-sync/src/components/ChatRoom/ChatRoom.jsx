import classNames from 'classnames/bind';
import chatRooomStyles from './ChatRoom.module.css';

import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from "firebase/database";
import * as chatService from '../../services/chatService';
import { AuthContext } from "../../contexts/AuthContext";
import { Whiteboard } from './Whiteboard/Whiteboard';
import { Chat } from './Chat/Chat';

let cx = classNames.bind(chatRooomStyles);

export const ChatRoom = () => {
    const { email } = useParams();
    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);
    const [messages, setMessage] = useState([]);
    // Read data on change
    useEffect(() => {
        if (email && currentUser) {
            const db = getDatabase();

            const id = chatService.getChatIdFromEmails(email, currentUser.email);

            onValue(ref(db, 'chat-rooms/' + id), (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    setMessage(data.messages);
                }
            });
        }
    }, [email, currentUser]);

    const handleMessageSend = async (messageInput) => {
        try {
            const currentTime = new Date();

            const year = currentTime.getFullYear();
            const month = currentTime.getMonth() + 1; // Month is zero-based, so add 1
            const day = currentTime.getDate();
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            const seconds = currentTime.getSeconds();

            const currentDate = {
                year,
                month,
                day,
                hours,
                minutes,
                seconds
            };

            await chatService.sendMessageFromToAsync(
                email,
                currentUser.email,
                messageInput,
                currentDate
            );
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className={cx('container')}>
            <Chat messages={messages} currentUser={currentUser} handleMessageSend={handleMessageSend}/>
            <div  className={cx('whiteboard-container')}>
                <Whiteboard id={chatService.getChatIdFromEmails(email, currentUser?.email)}/>
            </div>
        </div>
    )
}