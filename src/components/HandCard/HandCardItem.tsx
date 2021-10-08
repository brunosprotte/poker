import React from 'react';

import { Container } from './HandCardItem.styles';

interface HandCardItemProps {
    // dataTestId: string;
    isSelected: boolean;
    onClick(): void;
    _rest?: {}
}

const HandCardItem: React.FC<HandCardItemProps> = ({ isSelected, onClick, children, _rest }) => (
    <Container isSelected={isSelected} onClick={onClick} {..._rest}>
        {children}
    </Container>
);

export default HandCardItem;
