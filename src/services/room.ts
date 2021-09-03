import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

export function getRoomDoc(id: string, db) {
    const result = doc(collection(db, 'rooms'), id);

    return result;
}

export function revealedRoom(roomId: string, db) {
    const docRef = getRoomDoc(roomId, db);

    setDoc(docRef, {
        revealed: true
    }, {
        merge: true
    });
}
