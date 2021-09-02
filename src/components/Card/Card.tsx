import { Typography } from '@material-ui/core';
import React from 'react';

import { Container, CardPlaceHolder, CardFront, CardBack } from './Card.styles';

interface CardProps {
    isRevealed: boolean;
    value: number | string;
}

const Card: React.FC<CardProps> = ({ isRevealed, value }) => (
    <Container>
        <CardPlaceHolder isRevealed={isRevealed}>
            <CardBack />
            <CardFront>
                <Typography>{value}</Typography>
            </CardFront>
        </CardPlaceHolder>
    </Container>
);

export default Card;
