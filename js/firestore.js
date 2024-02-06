import { firebase } from "./firebase-config.js";
import {
    getFirestore,
    doc,
    setDoc,
    collection,
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";


// Firestore reference
const firestore = getFirestore(firebase);

async function saveInfoDb(location, object) {
    const reference = doc(firestore, ...location);

    try {
        await setDoc(reference, {
            name: object.displayName,
            email: object.email
        });
        console.log('User information saved to Firestore.');
    } catch (error) {
        console.error(error);
    }
}

export { saveInfoDb };
