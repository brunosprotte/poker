import React, { useState, useCallback, useEffect } from 'react';
import { deleteDoc, collection, onSnapshot, doc, addDoc } from 'firebase/firestore';

import PokerAppBar from '../components/AppBar/PokerAppBar';
import Table from '../components/Table/Table';
import Card from '../components/Card/Card';

import { Container, Content, Bottom } from '../../styles/room.styles';
import HandCardList from '../components/HandCard/HandCardList';

import AppLayout from '../components/AppLayout';
import initFirebase from '../config';
import { getRoomDoc, revealedRoom } from '../services/room';

const docName = "teste";

const Room: React.FC = () => {
    const [showCards, setShowCards] = useState(false);
    const [agreementLevel, setAgreementLevel] = useState('');
    const [votes, setVotes] = useState<{ id: string; email: string; value: number }[]>([]);

    const [userName, setUserName] = useState('');

    useEffect(() => {
        initFirebase();

        setUserName(prompt('Informe seu email'));

        onRealtimeReveal();

        onRealtimeRevealed();

    }, []);

    const handleRevealCards = useCallback(() => {

        if (!showCards) {
            setShowCards(true);
            revealedRoom(docName);
        }

    }, [showCards]);

    const onRealtimeReveal = useCallback(() => {

        const docRef = getRoomDoc(docName);
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

        const docRef = getRoomDoc(docName);

        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            const data = snapshot.data();

            setShowCards(!!data.revealed);
        });

        return unsubscribe;

    }, []);

    const handleUpdateCard = useCallback(async (value) => {

        const docRef = getRoomDoc(docName);

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

    const handleResetRoom = useCallback(async () => {

        const docRef = getRoomDoc(docName);

        const promises = votes.map((vote) => new Promise((resolve) => {
            const voteDoc = doc(collection(docRef, 'votes'), vote.id);
            deleteDoc(voteDoc).then(resolve);
        }));

        await Promise.all(promises);

    }, [votes]);

    useEffect(() => {
        if (showCards && votes.length) {

            const total: number = votes.reduce((agg, current) => agg + current.value, 0);
            setAgreementLevel(`${total / votes.length}%`);
        }
    }, [showCards, votes]);

    console.log('snapshot --->', votes);

    return (
        <AppLayout>
            <PokerAppBar />

            <Container>

                <button onClick={() => handleResetRoom()}>Reseta</button>
                <Content>
                    {
                        votes.map(vote =>
                            <Card
                                key={vote.email}
                                isRevealed={showCards}
                                value={vote.value}
                                owner={{ name: vote.email }}
                            />
                        )
                    }
                    <Table handleRevealCards={handleRevealCards} agreementLevel={agreementLevel} />
                </Content>
            </Container>
            <Bottom>
                <HandCardList
                    handType={1}
                    onClickCard={card => {
                        handleUpdateCard(card);
                    }}
                />
            </Bottom>
        </AppLayout>
    );
};

export default Room;
