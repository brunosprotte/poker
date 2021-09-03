import React from 'react';
import { Box, Button } from '@material-ui/core';

import { Container, Content, AgreementContainer } from './Table.styles';

interface TableProps {
    handleRevealCards(): void;
    agreementLevel: string;
}

const Table: React.FC<TableProps> = ({ handleRevealCards, agreementLevel }) => (
    <Container>
        <Content>
            <Button variant='outlined' color='primary' onClick={handleRevealCards}>
                Reveal
            </Button>

            <AgreementContainer>
                <Box fontWeight={500}>AGREEMENT: {agreementLevel}</Box>
            </AgreementContainer>
        </Content>
    </Container>
);
export default Table;
