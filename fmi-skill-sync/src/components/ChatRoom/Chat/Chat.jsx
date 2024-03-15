import classNames from 'classnames/bind';
import chatRooomStyles from './Chat.module.css';
import { useState } from 'react';
import { Message } from './Message/Message';

let cx = classNames.bind(chatRooomStyles);

export const Chat = ({ messages, currentUser, handleMessageSend }) => {

    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onClick = async (e) => {
        e.preventDefault();

        // Check if the message length is within the desired range
        if (message.trim().length < 1 || message.trim().length > 100) {
            setErrorMessage("Message must be between 1 and 100 characters.");
            return;
        }

        // Clear any previous error message
        setErrorMessage("");

        await handleMessageSend(message);

        setMessage('');
    }
    return (
        <>
            <div className={cx("box")}>
                <div className={cx("messages")}>
                    {messages?.map((msg, index) => (
                        <Message
                            key={index}
                            isYou={msg.from === currentUser.email}
                            text={msg.message}
                            date={msg.currentDate}
                            from={msg.from}
                        />
                    ))}
                </div>
                <div className={cx("input-container")}>
                    <input
                        type="text"
                        id="message"
                        className={cx("input-text")}
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                        autoFocus
                    />
                    {errorMessage && <p className={cx("error")}>{errorMessage}</p>}
                    <button type="button" className={cx("input-button")} onClick={onClick}>Submit</button>
                </div>
            </div>
        </>
    );
};