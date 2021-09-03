import React from 'react';

import { Container, CardPlaceHolder, CardFront, CardBack } from './Card.styles';

interface CardProps {
    owner: any;
    isRevealed: boolean;
    value: number | string;
}

const Card: React.FC<CardProps> = ({ owner, isRevealed, value }) => (
    <Container>
        <CardPlaceHolder isRevealed={isRevealed}>
            <CardBack />
            <CardFront>{value}</CardFront>
        </CardPlaceHolder>

        <p>{owner?.name}</p>
    </Container>
);

export default Card;
