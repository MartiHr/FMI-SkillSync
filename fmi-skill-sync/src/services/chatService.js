import { getDatabase, ref, get, set } from "firebase/database";
import { sha256 } from 'js-sha256';

export const sendMessageFromToAsync = async (email1, email2, message, currentDate) => {
    const db = getDatabase();
    const id = getChatIdFromEmails(email1, email2)
    const reference = ref(db, 'chat-rooms/' + id);

    // Fetch existing messages
    const snapshot = await get(reference);
    const existingMessages = snapshot.val()?.messages || [];

    // Append the new message to existing messages
    const updatedMessages = [...existingMessages, { message, currentDate, from: email2 }];

    // Update the database with the modified messages array
    set(reference, {
        users: [email1, email2],
        messages: updatedMessages
    });
};

export const getChatIdFromEmails = (email1, email2) => {

    const arrWithEmails = [email1, email2];
    arrWithEmails.sort();

    const id = sha256(arrWithEmails[0], arrWithEmails[1]);

    return id;
}

export const getAllChatRooms = async () => {
    const db = getDatabase();
    const chatRoomsRef = ref(db, 'chat-rooms');

    try {
        const snapshot = await get(chatRoomsRef);
        if (snapshot.exists()) {
            const chatRoomsData = snapshot.val();
            const chatRooms = Object.keys(chatRoomsData).map(chatRoomId => ({
                id: chatRoomId,
                users: chatRoomsData[chatRoomId].users
            }));
            return chatRooms;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching chat rooms:", error);
        return [];
    }
};