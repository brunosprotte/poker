import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useRouter } from "next/dist/client/router";
import React, { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { getRoomDoc, revealRoomCards, createRoomFirebase, getRoom } from '../services/room';

interface GameSetupInterface {
    name: string;
    roomId: string;
    roomName: string;
    gameType: 1 | 2 | 3 ;
    revealed: boolean;
}

const initialGameSetupState = {
    name: "",
    roomId: "",
    roomName: "",
    gameType: 2,
    revealed: false
};

interface RoomContextData {
    gameSetup: GameSetupInterface;
    agreementLevel: string;
    votes: { id: string; email: string; value: number }[];
    handleRevealCards(): void;
    setGameSetup(_gameSetup: GameSetupInterface): void;
    createRoom(_gameSetup: GameSetupInterface): Promise<void>;
    handleUpdateCard: (_value: string | number) => Promise<void>;
    handleResetRoom: () => Promise<void>
}

interface RoomProviderProps {
    children: ReactNode;
}

export const RoomContext = createContext({} as RoomContextData);

export function RoomProvider({ children }: RoomProviderProps) {

    const [openErrorDialog, setOpenErrorDialog] = useState(false);

    const [gameSetup, setGameSetup] = useState<GameSetupInterface>(initialGameSetupState as GameSetupInterface);

    // const [showCards, setShowCards] = useState(false);
    const [votes, setVotes] = useState([]);
    const [agreementLevel, setAgreementLevel] = useState('');
    // const [userName, setUserName] = useState('');

    const router = useRouter();
    const { roomId } = router.query;

    // useEffect(() => {
    //     // setUserName(prompt('Informe seu email'));
    //     onRealtimeReveal();
    //     onRealtimeRevealed();
    // }, []);

    useEffect(() => {
        if (gameSetup.revealed && votes.length) {

            const total: number = votes.reduce((agg, current) => agg + current.value, 0);
            setAgreementLevel(`${total / votes.length}%`);
        }
    }, [gameSetup.revealed, votes]);

    useEffect(() => {
        if (roomId) {
            joinRoom();
        }
        onRealtimeReveal();
        onRealtimeRevealed();
    }, [roomId]);

    async function createRoom(): Promise<void> {
        const { id } = await createRoomFirebase(gameSetup);
        setGameSetup({ ...gameSetup, roomId: id });

        router.push(`/room/${id}`);
    }

    const joinRoom = useCallback(async () => {
        if (!roomId) {
            return;
        }

        const room = await getRoom(String(roomId));

        if (!room) {
            setOpenErrorDialog(true);
            return;
        }

        console.log('Setup for room: ', room.id, "Room data: ", room.data());

        const { revealed, card, roomName } = room.data();

        setGameSetup({ ...gameSetup,  revealed, card, roomName, roomId: room.id } as GameSetupInterface);

        router.push(`/room/${roomId}`);
    }, [roomId]);

    const onRealtimeReveal = useCallback(() => {
        if (!gameSetup.roomId) {
            return;
        }

        const docRef = getRoomDoc(gameSetup.roomId);
        const votesRef = collection(docRef, 'votes');

        const unsubscribe = onSnapshot(votesRef, (snapshot) => {
            const { docs } = snapshot;
            console.log('votesDocs: ', docs);
            if (!docs.length) {
                setGameSetup({ ...gameSetup, revealed: false });
            }

            setVotes(docs.map(item => ({ ...item.data(), id: item.id } as any)));
        });

        return unsubscribe;

    }, [gameSetup.roomId]);

    const onRealtimeRevealed = useCallback(() => {
        if (!gameSetup.roomId) {
            return;
        }

        const docRef = getRoomDoc(gameSetup.roomId);

        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            const data = snapshot.data();
            if (data.revealed) {
                setGameSetup({ ...gameSetup, revealed: !!data.revealed });
            }

        });

        return unsubscribe;

    }, [gameSetup.roomId]);

    // eslint-disable-next-line consistent-return
    const handleUpdateCard = useCallback(async (value) => {
        const { name } = gameSetup;

        if (!gameSetup.roomId) {
            return;
        }

        const docRef = getRoomDoc(gameSetup.roomId);

        const votesCollection = collection(docRef, 'votes');

        const voteExists = votes.find(item => item.email === name);

        if (voteExists) {
            return alert("Ops, ja votou!");
        }

        await addDoc(votesCollection, {
            value,
            email: name
        });

    }, [votes]);

    const handleRevealCards = useCallback(() => {
        if (!gameSetup.revealed) {
            setGameSetup({ ...gameSetup, revealed: true });
            revealRoomCards(gameSetup.roomId);
        }
    }, [gameSetup.revealed]);

    const handleResetRoom = useCallback(async () => {
        const docRef = getRoomDoc(gameSetup.roomId);

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

        setGameSetup({ ...gameSetup, revealed: false });
        setAgreementLevel('');
    }, [votes]);

    return (
        <RoomContext.Provider value={{
            gameSetup,
            agreementLevel,
            votes,
            setGameSetup,
            createRoom,
            handleRevealCards,
            handleUpdateCard,
            handleResetRoom
        }}>
            {children}
            <Dialog
                data-testid="dialog-not-found-error"
                open={openErrorDialog}
            >
                <DialogContent>
                    <DialogContentText>
                        Room not found!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpenErrorDialog(!openErrorDialog)}
                        variant="outlined"
                        color="primary"
                        autoFocus >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </RoomContext.Provider>
    );

}
