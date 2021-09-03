import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

const db = getFirestore();

export function getRoomDoc(id: string) {
    const result = doc(collection(db, 'rooms'), id);

    return result;
}

export function revealedRoom(roomId: string) {
    const docRef = getRoomDoc(roomId);

    setDoc(docRef, {
        revealed: true
    }, {
        merge: true
    });
}
