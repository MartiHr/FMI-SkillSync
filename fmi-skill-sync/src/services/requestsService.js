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