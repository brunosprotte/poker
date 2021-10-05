import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";

interface GameSetupInterface {
    name: string;
    roomId: string;
    roomName: string;
    gameType: 1 | 2 | 3;
    revealed: boolean;
}

export function getRoomDoc(id: string) {
    const db = getFirestore();
    const result = doc(collection(db, 'rooms'), id);

    return result;
}

export async function getRoom(id: string) {
    const db = getFirestore();

    const querySnapshot = await getDocs(collection(db, "rooms"));
    return querySnapshot.docs.find(document => document.id === id);
}

export async function createRoomFirebase({ roomName, gameType, revealed }: GameSetupInterface) {
    const db = getFirestore();
    const docRef = await addDoc(collection(db, "rooms"),{
        roomName, gameType, revealed
    });
    return docRef;
}

export function revealRoomCards(roomId: string) {
    const docRef = getRoomDoc(roomId);

    setDoc(docRef, {
        revealed: true
    }, {
        merge: true
    });
}
