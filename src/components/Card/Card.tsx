import React, { useContext } from 'react';

import { Container, CardPlaceHolder, CardFront, CardBack } from './Card.styles';
import { RoomContext } from '../../contexts/RoomProvider';

interface CardProps {
    owner: any;
    value: number | string;
}

const Card: React.FC<CardProps> = ({ owner, value }) => {

    const { gameSetup } = useContext(RoomContext);

    return (
        <Container data-testid={owner.name}>
            {owner?.name}
            <CardPlaceHolder isRevealed={gameSetup.revealed}>
                <CardBack />
                <CardFront>{value}</CardFront>
            </CardPlaceHolder>

        </Container>
    );
};

export default Card;
