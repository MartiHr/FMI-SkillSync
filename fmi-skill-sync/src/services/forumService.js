import { collection, doc, getDocs, getDoc, addDoc, deleteDoc, query, Timestamp, orderBy, updateDoc } from "firebase/firestore";
import {db} from "../firebase/base.js";

export const getTopic = async (topicId) => {
    const topicRef = doc(db, "forumComents");
    const topicSnap = await getDoc(topicRef);
    return {...topicSnap.data(), id: topicId};

}

export const getAllTopics = async () => {
    const q = query(collection(db, "forumComents"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data())
    }))
}

export const createTopic = async (data) => {
    const dataWithTime = {...data, createdAt: Timestamp.now()}

    const topicRef = await addDoc(collection(db, "forumComents"), dataWithTime);
    
    return { ...dataWithTime, id: topicRef.id };
}

//fix update?
export const updateTopic = async (topicId, data) => {
    const topicRef = doc(db, 'forumComents', topicId);
    
    await updateDoc(topicRef, data);

    return { ...data, id:topicId};
}

export const deleteTopic = async (topicId) => {
    await deleteDoc(doc(db, "forumComents", topicId));
}

export const commentTopic = async (topicId, topicData, comments) => {
    const topicRef = doc(db, "forumComents", topicId);

    const allData = {...topicData, comments};

    await setDoc(topicRef, {...allData});

    return comments;
}