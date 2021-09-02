import React, { useState } from 'react';
import PokerAppBar from '../components/AppBar/PokerAppBar';
import Table from '../components/Table/Table';
import Card from '../components/Card/Card';

import { Bottom, Container } from '../../styles/room.styles';
import HandCardList from '../components/HandCard/HandCardList';

const Room: React.FC = () => {
    const [showCards, setShowCards] = useState(false);

    const handleRevealCards = () => {
        setShowCards(true);
    };

    return (
        <>
            <PokerAppBar />
            <Container>
                <Card isRevealed={showCards} value={8} />
                <Table handleRevealCards={handleRevealCards} />
            </Container>
            <Bottom>
                <HandCardList handType={1} />
            </Bottom>
        </>
    );
};

export default Room;
