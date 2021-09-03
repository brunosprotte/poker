import React, { useState } from 'react';
import PokerAppBar from '../components/AppBar/PokerAppBar';
import Table from '../components/Table/Table';
import Card from '../components/Card/Card';

import { Container, Content, Bottom } from '../../styles/room.styles';
import HandCardList from '../components/HandCard/HandCardList';

const Room: React.FC = () => {
    const [showCards, setShowCards] = useState(false);

    const [currentCard, setCurrentCard] = useState(null);

    const handleRevealCards = () => {
        setShowCards(true);
    };

    return (
        <>
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
                        setCurrentCard(card);
                    }}
                />
            </Bottom>
        </>
    );
};

export default Room;
