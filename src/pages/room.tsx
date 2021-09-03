import React, { useState, useCallback, useEffect } from 'react';
import { getFirestore, setDoc, collection, onSnapshot, doc } from 'firebase/firestore';
// import uuid from 'uuid';
import PokerAppBar from '../components/AppBar/PokerAppBar';
import Table from '../components/Table/Table';
import Card from '../components/Card/Card';

import { Container, Content, Bottom } from '../../styles/room.styles';
import HandCardList from '../components/HandCard/HandCardList';

import AppLayout from '../components/AppLayout';

const docName = "teste"; // uuid.v4();

const Room: React.FC = () => {
    const [showCards, setShowCards] = useState(false);

    const [currentCard, setCurrentCard] = useState(null);

    const handleRevealCards = () => {
        setShowCards(true);
    };

    const onRealtimeReveal = useCallback(() => {

        const db = getFirestore();

        const docRef = doc(collection(db, 'rooms'), docName);

        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            const data = snapshot.data();
            setCurrentCard(data.card);
        });

        return unsubscribe;

    }, []);

    const handleUpdateCard = useCallback(async (value) => {

        const db = getFirestore();

        const docRef = doc(collection(db, 'rooms'), docName);

        await setDoc(docRef, {
            card: value
        }, {
            merge: true
        });

    }, []);

    useEffect(() => {
        const unsubscribe = onRealtimeReveal();

        return () => unsubscribe();
    }, [onRealtimeReveal]);

    return (
        <AppLayout>
            <PokerAppBar />

            <Container>
                <Content>
                    <Card isRevealed={showCards} value={currentCard} />
                    <Table handleRevealCards={handleRevealCards} />
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
