import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

export function getRoomDoc(id: string) {
    const db = getFirestore();
    const result = doc(collection(db, 'rooms'), id);

    return result;
}

export function revealRoomCards(roomId: string) {
    const docRef = getRoomDoc(roomId);

    setDoc(docRef, {
        revealed: true
    }, {
        merge: true
    });
}
