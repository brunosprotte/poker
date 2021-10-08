import React, { useContext } from 'react';

import { Container, CardPlaceHolder, CardFront, CardBack } from './Card.styles';
import { RoomContext } from '../../contexts/RoomProvider';

interface CardProps {
    owner: any;
    value: number | string;
    _rest?: {};
}

const Card: React.FC<CardProps> = ({ owner, value, _rest }) => {

    const { gameSetup } = useContext(RoomContext);

    return (
        <Container {..._rest}>
            {owner?.name}
            <CardPlaceHolder isRevealed={gameSetup.revealed}>
                <CardBack />
                <CardFront data-testid={`played-card-value-${owner.name}`}>{value}</CardFront>
            </CardPlaceHolder>

        </Container>
    );
};

export default Card;
