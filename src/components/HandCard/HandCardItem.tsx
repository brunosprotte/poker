import React from 'react';

import { Container } from './HandCardItem.styles';

interface HandCardItemProps {
    isSelected: boolean;
    onClick(): void;
}

const HandCardItem: React.FC<HandCardItemProps> = ({ isSelected, onClick, children }) => (
    <Container isSelected={isSelected} onClick={onClick}>
        {children}
    </Container>
);

export default HandCardItem;
