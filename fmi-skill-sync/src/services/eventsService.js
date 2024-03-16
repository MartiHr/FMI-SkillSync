import { collection, doc, getDocs, getDoc, addDoc, deleteDoc, query, Timestamp, orderBy, updateDoc } from "firebase/firestore";
import { db } from "../firebase/base.js";

export const getEvent = async (eventId) => {
    const evetnRef = doc(db, "events");
    const evetnSnap = await getDoc(evetnRef);
    return { ...evetnSnap.data(), id: eventId };
}

export const getAllEvents = async () => {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data())
    }))
}

export const createEvent = async (data) => {
    if (!data.privateSession) {
        data.privateSession = ' ';
    }

    const dataWithTime = { ...data, createdAt: Timestamp.now() }

    const eventRef = await addDoc(collection(db, "events"), dataWithTime);

    return { ...dataWithTime, id: eventRef.id };
}

export const updateEvent = async (eventId, data) => {
    const eventRef = doc(db, 'events', eventId);

    await updateDoc(eventRef, data);

    return { ...data, id: eventId };
}

export const deleteEvent = async (eventId) => {
    await deleteDoc(doc(db, "events", eventId));
}

export const setTeacherToEvent = async (eventId, teacherEmail) => {
    console.log(eventId);
    console.log(teacherEmail);
    const eventRef = doc(db, 'events', eventId);

    // Update the event document with the teacher's information
    await updateDoc(eventRef, {
        teacherEmail: teacherEmail
    });

    // Return the updated event data
    const updatedEventSnap = await getDoc(eventRef);
    return { ...updatedEventSnap.data(), id: eventId };
}