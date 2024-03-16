import { collection, getDocs, addDoc, query, Timestamp, orderBy } from "firebase/firestore";
import { db } from "../firebase/base.js";

export const getAllRequestsForUser = async (email) => {
    const q = query(collection(db, "requests"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    // Filter the documents where the "to" property equals the provided email
    const filteredDocs = querySnapshot.docs.filter(doc => doc.data().to === email);

    return filteredDocs.map(doc => ({
        id: doc.id,
        ...(doc.data())
    }));
}

export const createRequest = async (data) => {
    const dataWithTime = { ...data, createdAt: Timestamp.now() }

    const eventRef = await addDoc(collection(db, "requests"), dataWithTime);

    return { ...dataWithTime, id: eventRef.id };
}

export const exists = async (to, from, eventId) => {
    const q = query(collection(db, "requests"));
    const querySnapshot = await getDocs(q);

    // Iterate through each document to check for matching properties
    for (const doc of querySnapshot.docs) {
        const data = doc.data();
        if (data.to === to && data.from === from && data.eventId === eventId) {
            return true; // Found a matching event
        }
    }

    return false; // No matching event found
}
