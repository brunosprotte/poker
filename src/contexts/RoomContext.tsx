import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import React, { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { getRoomDoc, revealRoomCards } from '../services/room';

interface RoomContextData {
    roomName: string;
    showCards: boolean;
    agreementLevel: string;
    votes: { id: string; email: string; value: number }[];
    handleRevealCards(): void;
    createRoom: (_roomName: string) => void;
    handleUpdateCard: (_value: string | number) => Promise<void>;
    handleResetRoom: () => Promise<void>
}

interface RoomProviderProps {
    children: ReactNode;
}

export const RoomContext = createContext({} as RoomContextData);

export function RoomProvider({ children }: RoomProviderProps) {
    const [roomName, setRoomName] = useState('teste');
    const [showCards, setShowCards] = useState(false);
    const [votes, setVotes] = useState([]);
    const [agreementLevel, setAgreementLevel] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        setUserName(prompt('Informe seu email'));

        onRealtimeReveal();

        onRealtimeRevealed();
    }, []);

    useEffect(() => {
        if (showCards && votes.length) {

            const total: number = votes.reduce((agg, current) => agg + current.value, 0);
            setAgreementLevel(`${total / votes.length}%`);
        }
    }, [showCards, votes]);

    function createRoom(name: string) {
        setRoomName(name);
    }

    const onRealtimeReveal = useCallback(() => {
        const docRef = getRoomDoc(roomName);
        const votesRef = collection(docRef, 'votes');

        const unsubscribe = onSnapshot(votesRef, (snapshot) => {
            const { docs } = snapshot;

            if (!docs.length) {
                setShowCards(false);
            }

            setVotes(docs.map(item => ({ ...item.data(), id: item.id } as any)));
        });

        return unsubscribe;

    }, []);

    const onRealtimeRevealed = useCallback(() => {
        const docRef = getRoomDoc(roomName);

        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            const data = snapshot.data();
            if (data.revealed){
                setShowCards(!!data.revealed);
            }

        });

        return unsubscribe;

    }, []);

    // eslint-disable-next-line consistent-return
    const handleUpdateCard = useCallback(async (value) => {
        const docRef = getRoomDoc(roomName);

        const votesCollection = collection(docRef, 'votes');

        const voteExists = votes.find(item => item.email === userName);

        if (voteExists) {
            return alert("Ops, ja votou!");
        }

        await addDoc(votesCollection, {
            value,
            email: userName
        });

    }, [votes, userName]);

    const handleRevealCards = useCallback(() => {
        if (!showCards) {
            setShowCards(true);
            revealRoomCards(roomName);
        }
    }, [showCards]);

    const handleResetRoom = useCallback(async () => {
        const docRef = getRoomDoc(roomName);

        const promises = votes.map((vote) => new Promise((resolve) => {
            const voteDoc = doc(collection(docRef, 'votes'), vote.id);
            deleteDoc(voteDoc).then(resolve);
        }));

        await Promise.all(promises);

        setDoc(docRef, {
            revealed: false
        }, {
            merge: true
        });

        setShowCards(false);
        setAgreementLevel('');
    }, [votes]);

    return (
        <RoomContext.Provider value={{
            roomName,
            showCards,
            agreementLevel,
            votes,
            createRoom,
            handleRevealCards,
            handleUpdateCard,
            handleResetRoom
        }}>
            {children}
        </RoomContext.Provider>
    );

}
