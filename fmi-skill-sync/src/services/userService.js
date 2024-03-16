import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const getProfilePictureByEmail = async (email) => {
    const storage = getStorage();

    let url;
    await getDownloadURL(ref(storage, `images/${email}`))
        .then((res) => {
            url = res;
        })
        .catch((error) => {
            console.log('Cannot get image with this email');
        });

    return url;
}